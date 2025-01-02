import mongoose, { Document } from 'mongoose';
export type UserDocument = UserEntity & Document;
export declare class UserEntity {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    images: string[];
    roles: string[];
    cart: mongoose.Schema.Types.ObjectId;
    orders: mongoose.Schema.Types.ObjectId[];
    wishlist: mongoose.Schema.Types.ObjectId;
    reviews?: mongoose.Schema.Types.ObjectId[];
    tokens?: {
        token: string;
    }[];
    resetPasswordToken?: string;
    resetPasswordTokenExpiry?: Date;
}
declare const UserSchema: mongoose.Schema<UserEntity, mongoose.Model<UserEntity, any, any, any, mongoose.Document<unknown, any, UserEntity> & UserEntity & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserEntity, mongoose.Document<unknown, {}, mongoose.FlatRecord<UserEntity>> & mongoose.FlatRecord<UserEntity> & {
    _id: mongoose.Types.ObjectId;
}>;
export { UserSchema };
