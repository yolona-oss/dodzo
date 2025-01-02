"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const cart_service_1 = require("../cart/cart.service");
const app_error_1 = require("./../../common/app-error");
const order_status_enum_1 = require("./../../common/enums/order-status.enum");
const opq_builder_1 = require("./../../common/misc/opq-builder");
let OrdersService = class OrdersService {
    constructor(ordersModel, cartService) {
        this.ordersModel = ordersModel;
        this.cartService = cartService;
    }
    async findAll() {
        return await this.ordersModel.find().
            populate({
            path: 'products',
            populate: {
                path: 'product'
            }
        }).exec();
    }
    async findById(id) {
        return await this.ordersModel.findById(id).
            populate({
            path: 'products',
            populate: {
                path: 'product'
            }
        }).exec();
    }
    async findCount(userId) {
        return await this.ordersModel.countDocuments({ user: userId });
    }
    async findUsersOrders(userId) {
        const orders = await this.ordersModel.find({ user: userId })
            .populate({
            path: 'products',
            populate: {
                path: 'product',
            }
        })
            .exec();
        return orders;
    }
    async findUserOrdersByStatus(userId, status) {
        const orders = await this.ordersModel.find({ user: userId, status: status })
            .populate({
            path: 'products',
            populate: {
                path: 'product',
            }
        })
            .exec();
        return orders;
    }
    async findFiltred(opts) {
        const page = opts.page ? parseInt(opts.page) : 1;
        const perPage = opts.perPage ? parseInt(opts.perPage) : undefined;
        const totalDocuments = await this.ordersModel.countDocuments();
        const totalPages = +Math.ceil(totalDocuments / (perPage || 1));
        if (totalDocuments === 0) {
            return {
                orders: [],
                totalPages: 0,
                page: 0
            };
        }
        if (page > totalPages) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_RANGE);
        }
        const query = new opq_builder_1.OPQBuilder()
            .addMustHaveKey("user")
            .addValidatorForKey("id", (v) => (0, mongoose_1.isValidObjectId)(v))
            .addValidatorForKey("user", (v) => (0, mongoose_1.isValidObjectId)(v))
            .addToQuery("id", opts.id)
            .addToQuery("status", opts.status, (v) => v.toLowerCase() === 'all')
            .addToQuery("user", opts.user)
            .build();
        const orders = await this.ordersModel.find(query, null, { skip: (page - 1) * (perPage || 0), limit: perPage })
            .populate({
            path: 'products',
            populate: {
                path: 'product',
            }
        })
            .exec();
        return {
            orders,
            totalPages,
            page
        };
    }
    async findUserOrdersCount(userId) {
        const count = await this.ordersModel.countDocuments({ user: userId });
        return count;
    }
    async createOrder(userId, products, paymentDetails) {
        try {
            const created = await this.ordersModel.create({
                user: userId,
                products: products,
                status: order_status_enum_1.OrderStatus.Pending,
                address: paymentDetails.address,
                paymentId: paymentDetails.paymentId,
                pincode: paymentDetails.pincode
            });
            if (!created) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE);
            }
            return created;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE, {
                errorMessage: "Cart cannot be created " + error?.message,
                userMessage: "Cart cannot be created " + error?.message
            });
        }
    }
    async setOrderStatus(orderId, status) {
        try {
            const updateData = new opq_builder_1.OPQBuilder()
                .addToQuery("status", status)
                .addToQuery("closingData", new Date())
                .build();
            return await this.ordersModel.updateOne({ _id: orderId }, updateData, { new: true })
                .populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            })
                .exec();
        }
        catch (e) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND, { errorMessage: "Order not found", userMessage: "Order not found" });
        }
    }
    async setCompleteOrder(orderId) {
        await this.setOrderStatus(orderId, order_status_enum_1.OrderStatus.Delivered);
    }
    async setCancelOrder(orderId) {
        return await this.setOrderStatus(orderId, order_status_enum_1.OrderStatus.Canceled);
    }
    async setShippedOrder(orderId) {
        return await this.setOrderStatus(orderId, order_status_enum_1.OrderStatus.Shipped);
    }
    async setPendingOrder(orderId) {
        return await this.setOrderStatus(orderId, order_status_enum_1.OrderStatus.Pending);
    }
    async removeUserOrders(userId) {
        try {
            return await this.ordersModel.deleteMany({ user: userId }).exec();
        }
        catch (e) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND, { errorMessage: "Orders not found", userMessage: "Orders not found" });
        }
    }
    async transfromCart(userId, paymentDetails) {
        const cart = await this.cartService.findByUser(userId);
        if (!cart) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        const cartProducts = cart.products.map((item) => {
            return {
                product: item.product.id,
                quantity: item.quantity
            };
        });
        const created = await this.createOrder(userId, cartProducts, paymentDetails);
        await this.cartService.clearCart(userId);
        return created;
    }
};
OrdersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('Orders')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.Model,
        cart_service_1.CartService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map