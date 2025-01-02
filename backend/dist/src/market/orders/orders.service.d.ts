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
import { Document, Model } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { OrdersDocument } from './schemas/orders.schema';
import { OrderStatus } from './../../common/enums/order-status.enum';
import { ProductEntity } from '../products/schemas/products.schema';
import { PopulateProductInterface } from './interfaces/populate-product.interface';
import { PaymentDetailsDto } from './dto/payment-details.dto';
import { FilteringOptions } from './interfaces/filtering-options.interface';
import { FiltredOrders } from './interfaces/filtered-orders.interface';
export declare class OrdersService {
    private readonly ordersModel;
    private readonly cartService;
    constructor(ordersModel: Model<OrdersDocument>, cartService: CartService);
    findAll(): Promise<(Document<unknown, {}, import("mongoose").MergeType<OrdersDocument, {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    }>> & Omit<OrdersDocument, "products"> & {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    } & Required<{
        _id: unknown;
    }>)[]>;
    findById(id: string): Promise<(Document<unknown, {}, import("mongoose").MergeType<OrdersDocument, {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    }>> & Omit<OrdersDocument, "products"> & {
        products: {
            product: ProductEntity;
            quantity: number;
        }[];
    } & Required<{
        _id: unknown;
    }>) | null>;
    findCount(userId?: string): Promise<number>;
    findUsersOrders(userId: string): Promise<(Document<unknown, {}, import("mongoose").MergeType<OrdersDocument, {
        products: {
            product: Document;
            quantity: number;
        }[];
    }>> & Omit<OrdersDocument, "products"> & {
        products: {
            product: Document;
            quantity: number;
        }[];
    } & Required<{
        _id: unknown;
    }>)[]>;
    private findUserOrdersByStatus;
    findFiltred(opts: FilteringOptions): Promise<FiltredOrders>;
    findUserOrdersCount(userId: string): Promise<number>;
    private createOrder;
    setOrderStatus(orderId: string, status: OrderStatus): Promise<import("mongoose").MergeType<import("mongoose").UpdateWriteOpResult, PopulateProductInterface>>;
    setCompleteOrder(orderId: string): Promise<void>;
    setCancelOrder(orderId: string): Promise<import("mongoose").MergeType<import("mongoose").UpdateWriteOpResult, PopulateProductInterface>>;
    setShippedOrder(orderId: string): Promise<import("mongoose").MergeType<import("mongoose").UpdateWriteOpResult, PopulateProductInterface>>;
    setPendingOrder(orderId: string): Promise<import("mongoose").MergeType<import("mongoose").UpdateWriteOpResult, PopulateProductInterface>>;
    removeUserOrders(userId: string): Promise<import("mongodb").DeleteResult>;
    transfromCart(userId: string, paymentDetails: PaymentDetailsDto): Promise<Document<unknown, {}, OrdersDocument> & import("./schemas/orders.schema").OrdersEntity & Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
