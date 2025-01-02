import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Role } from './../../common/enums/role.enum';

export type UserDocument = UserEntity & Document;

@Schema({
    toJSON: {
        virtuals: true,
        transform(_, ret) {
            delete ret.password
            delete ret.tokens
            delete ret?.resetPasswordToken
            delete ret?.resetPasswordTokenExpiry
            return ret
        }
    }
})
export class UserEntity {
    id: string;

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true, unique: true})
    phone: string;

    @Prop({type: String, required: true, unique: true})
    email: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: [String], required: true})
    images: string[];

    @Prop({type: [String], required: true, default: Role.User})
    roles: string[];

    /* Refresh tokens store */
    @Prop({ type: [ { token: {type: String, required: true } } ], required: false })
    tokens?: { token: string }[];

    @Prop({type: String, required: false})
    resetPasswordToken?: string;

    @Prop({type: Date, required: false})
    resetPasswordTokenExpiry?: Date
}

const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

export { UserSchema }
