import { Response } from 'express';
import { IJwtPayload } from 'auth/interfaces/jwt-payload.interface';
import { CartService } from './cart.service';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getAllCarts(response: Response): Promise<void>;
    getUserCart(user: IJwtPayload, response: Response): Promise<void>;
    totalCartPrice(user: IJwtPayload, response: Response): Promise<void>;
    addToCart(user: IJwtPayload, productId: string, quantity: number, response: Response): Promise<void>;
    removeFromCart(user: IJwtPayload, productId: string, response: Response): Promise<void>;
    updateProductQuantity(user: IJwtPayload, productId: string, quantity: number, response: Response): Promise<void>;
    clearCart(user: IJwtPayload, response: Response): Promise<void>;
}
