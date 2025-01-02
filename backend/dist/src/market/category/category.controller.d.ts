import { Response } from 'express';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    findSome(query: any, response: Response): Promise<void>;
    getCategoryEntriesCount(response: Response): Promise<void>;
    createCategory(body: {
        name: string;
        subCat: string;
        images: string[];
        color: string;
    }, response: Response): Promise<void>;
    getCategoryById(id: string, response: Response): Promise<void>;
    removeById(id: string, response: Response): Promise<void>;
    updateById(id: string, body: {
        name?: string;
        images?: string[];
        color?: string;
    }, response: Response): Promise<void>;
}
