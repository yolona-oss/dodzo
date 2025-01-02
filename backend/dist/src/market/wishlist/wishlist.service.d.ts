import mongoose, { Model } from 'mongoose';
import { FindInListQuery } from './interfaces/find-query.interface';
import { WishlistDocument } from './schemas/wishlist.schema';
export declare class WishlistService {
    private readonly wishlistModel;
    constructor(wishlistModel: Model<WishlistDocument>);
    findById(id: string): Promise<mongoose.Document<unknown, {}, WishlistDocument> & import("./schemas/wishlist.schema").WishlistEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findAll(): Promise<WishlistDocument[]>;
    findCount(): Promise<number>;
    findByUser(userId: string): Promise<WishlistDocument>;
    isContainsProduct(userId: string, productId: string): Promise<boolean>;
    findFiltredWrapper(query: FindInListQuery): Promise<WishlistDocument[]>;
    create(userId: string, productIds: string[] | mongoose.Types.ObjectId[]): Promise<mongoose.Document<unknown, {}, WishlistDocument> & import("./schemas/wishlist.schema").WishlistEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    addToWishlist(userId: string, productId: string): Promise<Omit<mongoose.Document<unknown, {}, WishlistDocument> & import("./schemas/wishlist.schema").WishlistEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, never>>;
    removeFromWishlist(userId: string, productId: string): Promise<Omit<mongoose.Document<unknown, {}, WishlistDocument> & import("./schemas/wishlist.schema").WishlistEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, never>>;
    clearWishlist(userId: string): Promise<void>;
    removeUserWishlist(userId: string): Promise<mongoose.Document<unknown, {}, WishlistDocument> & import("./schemas/wishlist.schema").WishlistEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
