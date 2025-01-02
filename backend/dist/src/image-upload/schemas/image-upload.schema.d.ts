/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Document } from 'mongoose';
export type ImagesDocument = ImagesEntity & Document;
export declare class ImagesEntity {
    id: string;
    blankType?: string;
    name?: string;
    description?: string;
    imageUrl: string;
}
declare const ImagesSchema: import("mongoose").Schema<ImagesEntity, import("mongoose").Model<ImagesEntity, any, any, any, Document<unknown, any, ImagesEntity> & ImagesEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ImagesEntity, Document<unknown, {}, import("mongoose").FlatRecord<ImagesEntity>> & import("mongoose").FlatRecord<ImagesEntity> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export { ImagesSchema };
