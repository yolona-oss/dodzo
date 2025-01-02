import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { ReviewsDocument } from './schemes/reviews.schema';
import { ProductEntity } from '../schemes/products.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { AppError, AppErrorTypeEnum } from './../../../common/app-error';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel('ProductReviews')
        readonly productReviewsModel: Model<ReviewsDocument>
    ) { }

    async findAll() {
        return await this.productReviewsModel.find().populate('product').exec() || []
    }

    async findById(id: string) {
        try {
            const doc = await this.productReviewsModel.findById(id).populate('product').exec()
            if (!doc) {
                throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
            }
            return doc
        } catch (error) {
            if (error instanceof AppError) {
                throw error
            }
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
    }

    async findCount() {
        return await this.productReviewsModel.countDocuments() || 0
    }

    async findUserReviews(userId: string) {
        return await this.productReviewsModel.find({user: userId})
            .populate<{ product: ProductEntity }>('product').exec() || []
    }

    async findByProductId(productId: string) {
        return await this.productReviewsModel.find({product: productId}).populate('product').exec() || []
    }

    async createReview(data: CreateReviewDto) {
        try {
            const doc = await this.productReviewsModel.create(data)
            if (!doc) {
                throw new AppError(AppErrorTypeEnum.DB_CANNOT_CREATE)
            }
            return doc
        } catch (error) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_CREATE, {
                errorMessage: JSON.stringify(error)
            })
        }
    }
}
