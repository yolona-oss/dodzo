import { Document } from "mongoose";
import { ProductDocument } from "./../schemas/products.schema";

export interface FiltredProducts {
    products: Document<unknown, any, ProductDocument>[],
    count: number,
    offset: number
}
