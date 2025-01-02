import mongoose, { Document } from 'mongoose';
export type CartDocument = CartEntity & Document;
export declare class CartEntity {
    user: mongoose.Schema.Types.ObjectId;
    products: {
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
    }[];
}
declare const CartSchema: mongoose.Schema<CartEntity, mongoose.Model<CartEntity, any, any, any, mongoose.Document<unknown, any, CartEntity> & CartEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CartEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<CartEntity>> & mongoose.FlatRecord<CartEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { CartSchema };
