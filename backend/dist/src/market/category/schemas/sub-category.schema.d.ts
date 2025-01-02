import mongoose, { Document } from 'mongoose';
export type SubCategoryDocument = SubCategoryEntity & Document;
export declare class SubCategoryEntity {
    category: mongoose.Schema.Types.ObjectId;
    name: string;
}
declare const SubCategorySchema: mongoose.Schema<SubCategoryEntity, mongoose.Model<SubCategoryEntity, any, any, any, mongoose.Document<unknown, any, SubCategoryEntity> & SubCategoryEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, SubCategoryEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<SubCategoryEntity>> & mongoose.FlatRecord<SubCategoryEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { SubCategorySchema };
