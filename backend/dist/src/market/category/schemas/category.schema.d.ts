import mongoose, { Document } from 'mongoose';
export type CategoryDocument = CategoryEntity & Document;
export declare class CategoryEntity {
    name: string;
    images: mongoose.Schema.Types.ObjectId[];
    color: string;
}
declare const CategorySchema: mongoose.Schema<CategoryEntity, mongoose.Model<CategoryEntity, any, any, any, mongoose.Document<unknown, any, CategoryEntity> & CategoryEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CategoryEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<CategoryEntity>> & mongoose.FlatRecord<CategoryEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { CategorySchema };
