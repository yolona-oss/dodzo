import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Address } from './../../types/address.type';

export type AddressBookDocument = AddressBookEntity & Document;

@Schema({
    toJSON: {
        virtuals: true,
    }
})
export class AddressBookEntity {
    @Prop({type: {
        coordinates: {
            lat: {type: Number, required: true},
            lng: {type: Number, required: true},
        },
    }, required: true, unique: true})

    @Prop({type: String, required: true, unique: true})
    address: Address

    @Prop({type: String, required: true})
    label: string
}

export const AddressBookSchema = SchemaFactory.createForClass(AddressBookEntity);
