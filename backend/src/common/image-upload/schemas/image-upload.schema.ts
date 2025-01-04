import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ImagesDocument = ImagesEntity & Document;

@Schema({
    toJSON: {
        virtuals: true,
    }
})
export class ImagesEntity {
    /***
    * Using for accosiate with pre uploaded images.
    * Like default profile image for user or default image for product.
    */
    @Prop({type: String, required: false, unique: true})
    blankType?: string;

    @Prop({type: String, required: true})
    uploader: string;

    @Prop({type: mongoose.Schema.Types.Mixed, required: false})
    uploaderData?: any

    @Prop({type: String, default: "image"})
    alt?: string;

    @Prop({type: String, required: true})
    url: string;
}

const ImagesSchema = SchemaFactory.createForClass(ImagesEntity);

export { ImagesSchema }
