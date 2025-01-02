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
import { CartDocument } from './schemas/cart.schema';
import { CartProduct, CartProducts } from './dto/cart-product.dto';
import { ProductEntity } from '../products/schemas/products.schema';
export declare class CartService {
    readonly cartModel: Model<CartDocument>;
    constructor(cartModel: Model<CartDocument>);
    create(userId: string, products?: CartProducts): Promise<import("mongoose").Document<unknown, {}, CartDocument> & import("./schemas/cart.schema").CartEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    removeUserCart(userId: string): Promise<import("mongodb").DeleteResult>;
    clearCart(userId: string): Promise<import("mongoose").UpdateWriteOpResult>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<CartDocument, {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    }>> & Omit<CartDocument, "products"> & {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    } & Required<{
        _id: unknown;
    }>)[]>;
    findByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").MergeType<CartDocument, {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    }>> & Omit<CartDocument, "products"> & {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    } & Required<{
        _id: unknown;
    }>) | null>;
    totalCartPrice(userId: string): Promise<number>;
    addToCart(userId: string, product: CartProduct): Promise<import("mongoose").MergeType<import("mongoose").UpdateWriteOpResult, {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    }>>;
    removeFromCart(userId: string, productId: string): Promise<import("mongoose").MergeType<import("mongoose").UpdateWriteOpResult, {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    }>>;
    changeProductQuantity(userId: string, productId: string, quantity: number): Promise<import("mongoose").MergeType<import("mongoose").UpdateWriteOpResult, {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    }>>;
}
