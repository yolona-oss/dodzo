import mongoose, { Document } from 'mongoose';
export type WishlistDocument = WishlistEntity & Document;
export declare class WishlistEntity {
    user: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId[];
}
declare const WishlistSchema: mongoose.Schema<WishlistEntity, mongoose.Model<WishlistEntity, any, any, any, mongoose.Document<unknown, any, WishlistEntity> & WishlistEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, WishlistEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<WishlistEntity>> & mongoose.FlatRecord<WishlistEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { WishlistSchema };
