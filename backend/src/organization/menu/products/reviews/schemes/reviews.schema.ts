import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ReviewsDocument = ReviewsEntity & Document;

@Schema({
    toJSON: {
        virtuals: true
    },
    timestamps: true
})
export class ReviewsEntity {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true})
    product: mongoose.Schema.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Customers', required: true})
    customer: mongoose.Schema.Types.ObjectId;

    // review text
    @Prop({type: String, required: true, default: ""})
    body: string;

    @Prop({type: Number, required: true, default: 1})
    rating: number;
}

export const ReviewsSchema = SchemaFactory.createForClass(ReviewsEntity);
