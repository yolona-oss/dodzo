import mongoose, { Document } from 'mongoose';
export type ProductDocument = ProductEntity & Document;
export declare class ProductEntity {
    id?: string;
    name: string;
    description: string;
    images: mongoose.Schema.Types.ObjectId[];
    brand?: string;
    price?: number;
    oldPrice?: number;
    category: mongoose.Schema.Types.ObjectId;
    subCategory: mongoose.Schema.Types.ObjectId;
    countInStock: number;
    rating?: number;
    isFeatured?: boolean;
    discount?: number;
    rams?: string[];
    size?: string[];
    weight?: string[];
    location?: string;
    dateCreated?: Date;
}
declare const ProductSchema: mongoose.Schema<ProductEntity, mongoose.Model<ProductEntity, any, any, any, mongoose.Document<unknown, any, ProductEntity> & ProductEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ProductEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<ProductEntity>> & mongoose.FlatRecord<ProductEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { ProductSchema };
