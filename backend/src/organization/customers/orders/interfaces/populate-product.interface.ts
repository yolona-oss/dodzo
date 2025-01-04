import { ProductEntity } from './../../../menu/products/schemes/products.schema';

export interface PopulateProductInterface {
    products: {
        product: ProductEntity,
        quantity: number
    }
}
