/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { ProductReviewsDocument } from './schemas/product-reviews.schema';
import { ProductEntity } from '../schemas/products.schema';
import { CreateProductReviewDto } from './dto/create-review.dto';
export declare class ProductReviewsService {
    readonly productReviewsModel: Model<ProductReviewsDocument>;
    constructor(productReviewsModel: Model<ProductReviewsDocument>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, ProductReviewsDocument> & import("./schemas/product-reviews.schema").ProductReviewsEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, ProductReviewsDocument> & import("./schemas/product-reviews.schema").ProductReviewsEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findCount(): Promise<number>;
    findUserReviews(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<ProductReviewsDocument, {
        product: ProductEntity;
    }>> & Omit<ProductReviewsDocument, "product"> & {
        product: ProductEntity;
    } & Required<{
        _id: unknown;
    }>)[]>;
    findByProductId(productId: string): Promise<(import("mongoose").Document<unknown, {}, ProductReviewsDocument> & import("./schemas/product-reviews.schema").ProductReviewsEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
    createReview(data: CreateProductReviewDto): Promise<import("mongoose").Document<unknown, {}, ProductReviewsDocument> & import("./schemas/product-reviews.schema").ProductReviewsEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
