import { WishlistService } from './wishlist.service';
import { Response } from 'express';
import { IJwtPayload } from 'auth/interfaces/jwt-payload.interface';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    get(query: any, response: Response): Promise<void>;
    getUserWishlist(user: IJwtPayload, response: Response): Promise<void>;
    isContainsProduct(user: IJwtPayload, productId: string, response: Response): Promise<void>;
    addToWishlist(user: IJwtPayload, productId: string, response: Response): Promise<void>;
    removeFromWishlist(user: IJwtPayload, productId: string, response: Response): Promise<void>;
    clearWishlist(user: IJwtPayload, response: Response): Promise<void>;
}
