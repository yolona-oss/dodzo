import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = ProductEntity & Document;

@Schema({
    toJSON: {
        virtuals: true
    },
    timestamps: true
})
export class ProductEntity {
    @Prop({type: String, required: true})
    title: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: String, required: true})
    sku: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Images', required: true})
    primaryImage: mongoose.Schema.Types.ObjectId;

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'Images', required: false, default: []})
    images: mongoose.Schema.Types.ObjectId[];

    @Prop({type: Number, required: true})
    price: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true})
    category: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true})
    subCategory: mongoose.Schema.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
