import mongoose, { Document } from 'mongoose';
export type HomeBannerDocument = HomeBannerEntity & Document;
export declare class HomeBannerEntity {
    id: string;
    title?: string;
    images: mongoose.Schema.Types.ObjectId[];
}
declare const HomeBannerSchema: mongoose.Schema<HomeBannerEntity, mongoose.Model<HomeBannerEntity, any, any, any, mongoose.Document<unknown, any, HomeBannerEntity> & HomeBannerEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, HomeBannerEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<HomeBannerEntity>> & mongoose.FlatRecord<HomeBannerEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { HomeBannerSchema };
