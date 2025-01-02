"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const parse_object_id_pipe_1 = require("./../../common/pipes/parse-object-id.pipe");
const cart_service_1 = require("./cart.service");
const user_decorator_1 = require("./../../common/decorators/user.decorator");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getAllCarts(response) {
        const docs = await this.cartService.findAll();
        response.status(200).json(docs);
    }
    async getUserCart(user, response) {
        const cart = await this.cartService.findByUser(user.id);
        response.status(200).json(cart);
    }
    async totalCartPrice(user, response) {
        const total = await this.cartService.totalCartPrice(user.id);
        response.status(200).json(total);
    }
    async addToCart(user, productId, quantity, response) {
        const cartProduct = {
            product: productId,
            quantity: quantity
        };
        const cart = await this.cartService.addToCart(user.id, cartProduct);
        response.status(200).json(cart);
    }
    async removeFromCart(user, productId, response) {
        const cart = await this.cartService.removeFromCart(user.id, productId);
        response.status(200).json(cart);
    }
    async updateProductQuantity(user, productId, quantity, response) {
        const cart = await this.cartService.changeProductQuantity(user.id, productId, quantity);
        response.status(200).json(cart);
    }
    async clearCart(user, response) {
        const cart = await this.cartService.clearCart(user.id);
        response.status(200).json(cart);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/all'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "getAllCarts", null);
tslib_1.__decorate([
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "getUserCart", null);
tslib_1.__decorate([
    (0, common_1.Get)('/total'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "totalCartPrice", null);
tslib_1.__decorate([
    (0, common_1.Put)('/add'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Query)('productId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Query)('quantity', common_1.ParseIntPipe, new common_1.DefaultValuePipe(1))),
    tslib_1.__param(3, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
tslib_1.__decorate([
    (0, common_1.Put)('/remove'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Query)('productId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
tslib_1.__decorate([
    (0, common_1.Put)('/set-quantity'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Query)('productId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Query)('quantity', common_1.ParseIntPipe, new common_1.DefaultValuePipe(1))),
    tslib_1.__param(3, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "updateProductQuantity", null);
tslib_1.__decorate([
    (0, common_1.Put)('/clear'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
CartController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map