"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const app_error_1 = require("./../../common/app-error");
let CartService = class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async create(userId, products = []) {
        try {
            return await this.cartModel.create({ user: userId, products: products });
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE, {
                errorMessage: "Cart cannot be created " + error?.message,
                userMessage: "Cart cannot be created " + error?.message
            });
        }
    }
    async removeUserCart(userId) {
        try {
            return await this.cartModel.deleteOne({ user: userId }).exec();
        }
        catch (e) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND, { errorMessage: "Cart not found", userMessage: "Cart not found" });
        }
    }
    async clearCart(userId) {
        try {
            return await this.cartModel.updateOne({ user: userId }, { products: [] }).exec();
        }
        catch (e) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND, { errorMessage: "Cart not found", userMessage: "Cart not found" });
        }
    }
    async findAll() {
        return await this.cartModel.find().
            populate({
            path: 'products',
            populate: {
                path: 'product'
            }
        })
            .exec();
    }
    async findByUser(userId) {
        return await this.cartModel.findOne({ customer: userId }).
            populate({
            path: 'products',
            populate: {
                path: 'product'
            }
        }).exec();
    }
    async totalCartPrice(userId) {
        const cart = await this.findByUser(userId);
        if (!cart) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        if (cart.products.length === 0) {
            return 0;
        }
        return cart.products
            .reduce((total, product) => total + product.product.price * product.quantity, 0);
    }
    async addToCart(userId, product) {
        try {
            const res = await this.cartModel.updateOne({ customer: userId }, { $addToSet: { products: product } }, { new: true })
                .populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            }).exec();
            return res;
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE);
        }
    }
    async removeFromCart(userId, productId) {
        try {
            const res = await this.cartModel.updateOne({ customer: userId }, { $pull: { products: { product: productId } } }, { new: true })
                .populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            }).exec();
            return res;
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE);
        }
    }
    async changeProductQuantity(userId, productId, quantity) {
        try {
            const res = await this.cartModel.updateOne({ customer: userId }, { $set: { "products.$[elem].quantity": quantity } }, { arrayFilters: [{ elem: { product: productId } }], new: true })
                .populate({
                path: 'products',
                populate: {
                    path: 'product'
                }
            }).exec();
            return res;
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE);
        }
    }
};
CartService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('Cart')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.Model])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map