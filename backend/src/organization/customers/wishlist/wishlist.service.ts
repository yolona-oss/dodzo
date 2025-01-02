import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { FindInListQuery } from './interfaces/find-query.interface';
//import { AddToListQuery, RemoveFromListQuery } from './interfaces/list-operation-query.interface';
import { OPQBuilder } from './../../common/misc/opq-builder';

import { WishlistDocument } from './schemas/wishlist.schema';

import { AppError, AppErrorTypeEnum } from './../../common/app-error';


@Injectable()
export class WishlistService {
    constructor(
        @InjectModel('Wishlist')
        private readonly wishlistModel: Model<WishlistDocument>,
    ) {}

    async findById(id: string) {
        const doc = await this.wishlistModel.findById(id).populate('products').exec()
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async findAll(): Promise<WishlistDocument[]> {
        const docs = await this.wishlistModel.find().populate('products').exec()
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async findCount() {
        const count = await this.wishlistModel.countDocuments()
        return count
    }

    async findByUser(userId: string): Promise<WishlistDocument> {
        const userList = await this.wishlistModel.findOne({ user: userId }).exec()
        if (!userList) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return await userList.populate('products')
    }

    async isContainsProduct(userId: string, productId: string) {
        const doc = await this.wishlistModel.find({ user: userId, products: { $in: [productId]} }).populate('products').exec()
        if (!doc) {
            return false
        }
        return true
    }

    async findFiltredWrapper(query: FindInListQuery): Promise<WishlistDocument[]> {
        const dbQuery = new OPQBuilder()
            .from({})
            .addToQuery('user', query.user)
            .addToQuery('products', query.product)
            .build()

        const docs = await this.wishlistModel.find(dbQuery).populate('products').exec()
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async create(userId: string, productIds: string[] | mongoose.Types.ObjectId[]) {
        const created = await this.wishlistModel.create({user: userId, products: productIds})
        if (!created) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_CREATE)
        }
        return created
    }

    async addToWishlist(userId: string, productId: string) {
        const updated = await this.wishlistModel.findOneAndUpdate({ user: userId }, {
            $addToSet: {
                // @ts-ignore
                products: new mongoose.Types.ObjectId(productId)
            }
        }, { new: true })

        if (!updated) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_UPDATE)
        }

        return await updated.populate('products')
    }

    async removeFromWishlist(userId: string, productId: string) {
        const updated = await this.wishlistModel.findOneAndUpdate({ user: userId }, {
            $pull: {
                // @ts-ignore
                products: new mongoose.Types.ObjectId(productId)
            }
        }, { new: true })

        if (!updated) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_UPDATE)
        }

        return await updated.populate('products')
    }

    async clearWishlist(userId: string) {
        try {
            const deleted = await this.wishlistModel.findOneAndUpdate({ user: userId }, {
                $set: {
                    products: []
                }
            }, { new: true })
        } catch (error) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_UPDATE)
        }
        return true
    }

    async removeUserWishlist(userId: string) {
        const deleted = await this.wishlistModel.findOneAndDelete({ user: userId })
        if (!deleted) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_DELETE)
        }
        return deleted
    }
}
