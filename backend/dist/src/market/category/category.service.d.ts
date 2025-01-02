import { Document, Model } from 'mongoose';
import { CategoryDocument } from './schemas/category.schema';
import { SubCategoryDocument } from './schemas/sub-category.schema';
import { ImageUploadService } from './../../image-upload/image-upload.service';
import { CRUDService } from './../../common/misc/crud-service';
import { FilteringCategoryOptions } from './interfaces/filtring-category-options.interface';
import { FiltredCategoryList } from './interfaces/filtred-category-list.interface';
import { DeepPartial } from './../../common/types/deep-partial.type';
export declare class CategoryService extends CRUDService<CategoryDocument> {
    private readonly categoryModel;
    private readonly subCategoryModel;
    private readonly imageUploadService;
    constructor(categoryModel: Model<CategoryDocument>, subCategoryModel: Model<SubCategoryDocument>, imageUploadService: ImageUploadService);
    findFiltredWrapper(opts: FilteringCategoryOptions): Promise<FiltredCategoryList>;
    getDocumentById(id: string): Promise<CategoryDocument>;
    createDocument(data: Omit<CategoryDocument, keyof Document<unknown, any, any>>): Promise<CategoryDocument>;
    updateDocumentById(id: string, newData: DeepPartial<CategoryDocument>): Promise<CategoryDocument>;
    removeDocumentById(id: string): Promise<any>;
}
