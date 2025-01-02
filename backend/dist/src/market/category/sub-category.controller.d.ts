import { Response } from 'express';
import { SubCategoryService } from './sub-category.service';
export declare class SubCategoryController {
    private subCategoryService;
    constructor(subCategoryService: SubCategoryService);
    findSome(query: any, response: Response): Promise<void>;
    count(response: Response): Promise<void>;
    create(body: {
        category: string;
        subCat: string;
    }, response: Response): Promise<void>;
    getById(id: string, response: Response): Promise<void>;
    remove(id: string, response: Response): Promise<void>;
    updateById(id: string, body: {
        category: string;
        subCat: string;
    }, response: Response): Promise<void>;
}
