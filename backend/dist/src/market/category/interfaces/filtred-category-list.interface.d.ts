import { CategoryDocument } from "../schemas/category.schema";
export interface FiltredCategoryList {
    categoryList: CategoryDocument[];
    totalPages: number;
    page: number;
}
