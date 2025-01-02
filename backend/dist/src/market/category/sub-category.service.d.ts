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
import { Model } from 'mongoose';
import { SubCategoryDocument } from './schemas/sub-category.schema';
import { CRUDService } from './../../common/misc/crud-service';
import { FilteringSubCategoryOptions } from './interfaces/filtring-sub-category-options.interface';
import { FiltredSubCategoryList } from './interfaces/filtred-sub-category.interface';
import { CategoryDocument } from './schemas/category.schema';
export declare class SubCategoryService extends CRUDService<SubCategoryDocument> {
    readonly subCategoryModel: Model<SubCategoryDocument>;
    private readonly categoryModel;
    constructor(subCategoryModel: Model<SubCategoryDocument>, categoryModel: Model<CategoryDocument>);
    findFiltredWrapper(opts: FilteringSubCategoryOptions): Promise<FiltredSubCategoryList>;
    getAllDocuments(): Promise<(import("mongoose").Document<unknown, {}, SubCategoryDocument> & import("./schemas/sub-category.schema").SubCategoryEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
}
