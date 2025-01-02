import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CustomerEntity } from './schemes/customers.schema';

import { AppError, AppErrorTypeEnum } from './../../common/app-error';
import { CartService } from './cart/cart.service';
import { WishlistService } from './wishlist/wishlist.service';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel('Customer')
        private readonly customerModel: Model<CustomerEntity>
        private readonly cartService: CartService,
        private readonly wishlistService: WishlistService
    ) {}

    async findAll() {
        const docs = await this.customerModel.find().exec();
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async findById(id: string) {
        const doc = await this.customerModel.findById(id).exec();
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async findByUser(userId: string) {
        const doc = await this.customerModel.findOne({user: userId}).exec();
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async create(userId: string) {
        const doc = await this.customerModel.create({user: userId})
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }
}
