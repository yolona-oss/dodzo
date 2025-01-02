import mongoose, { Document } from 'mongoose';
export type ProductReviewsDocument = ProductReviewsEntity & Document;
export declare class ProductReviewsEntity {
    product: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    review: string;
    customerRating: number;
    dateCreated: Date;
}
declare const ProductReviewsSchema: mongoose.Schema<ProductReviewsEntity, mongoose.Model<ProductReviewsEntity, any, any, any, mongoose.Document<unknown, any, ProductReviewsEntity> & ProductReviewsEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ProductReviewsEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<ProductReviewsEntity>> & mongoose.FlatRecord<ProductReviewsEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { ProductReviewsSchema };
