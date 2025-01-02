import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from './../../../common/types/address.type';
import mongoose, { Document } from 'mongoose';

export type CustomerDocument = CustomerEntity & Document;

@Schema({
    toJSON: {
        virtuals: true,
    }
})
export class CustomerEntity {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true})
    user: mongoose.Schema.Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true})
    cart: mongoose.Schema.Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Orders', required: true})
    orders: mongoose.Schema.Types.ObjectId

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'AddressBook', required: false, default: []})
    deliveryAddress: mongoose.Schema.Types.ObjectId[]
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);
