import mongoose, { Document } from 'mongoose';
export type OrdersDocument = OrdersEntity & Document;
export declare class OrdersEntity {
    user: mongoose.Schema.Types.ObjectId;
    products: {
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
    }[];
    status: string;
    address: string;
    pincode: string;
    paymentId: string;
    creationData: Date;
    closingData?: Date;
}
declare const OrdersSchema: mongoose.Schema<OrdersEntity, mongoose.Model<OrdersEntity, any, any, any, mongoose.Document<unknown, any, OrdersEntity> & OrdersEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, OrdersEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<OrdersEntity>> & mongoose.FlatRecord<OrdersEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { OrdersSchema };
