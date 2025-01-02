import { Response } from 'express';
import { ProductReviewsService } from './product-reviews/product-reviews.service';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './schemas/products.schema';
import { CreateProductReviewDto } from './product-reviews/dto/create-review.dto';
export declare class ProductsController {
    private readonly productsService;
    private readonly reviewsService;
    constructor(productsService: ProductsService, reviewsService: ProductReviewsService);
    findSome(query: any, response: Response): Promise<Response<any, Record<string, any>>>;
    productsCount(response: Response): Promise<void>;
    create(data: CreateProductDto, response: Response): Promise<void>;
    productById(id: string, response: Response): Promise<void>;
    productReviews(id: string, response: Response): Promise<void>;
    createProductReviews(id: string, data: CreateProductReviewDto, response: Response): Promise<Response<any, Record<string, any>>>;
    removeProductById(id: string, response: Response): Promise<void>;
    updateProductById(id: string, newData: Partial<ProductEntity>, response: Response): Promise<void>;
}
