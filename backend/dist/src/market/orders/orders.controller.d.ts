import { Response } from 'express';
import { OrdersService } from './orders.service';
import { OrderStatus } from './../../common/enums/order-status.enum';
import { IJwtPayload } from 'auth/interfaces/jwt-payload.interface';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAll(response: Response): Promise<void>;
    getCount(response: Response): Promise<void>;
    udpateOrderStatus(orderId: string, status: OrderStatus, response: Response): Promise<void>;
    getById(id: string, response: Response): Promise<void>;
    createOrder(user: IJwtPayload, address: string, pincode: string, paymentId: string, response: Response): Promise<void>;
    getAllUserOrders(user: IJwtPayload, orderStatus: any, userOrderId: any, response: Response): Promise<void>;
    countUserOrders(user: IJwtPayload, response: Response): Promise<void>;
}
