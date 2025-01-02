"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const order_status_enum_1 = require("./../../common/enums/order-status.enum");
const user_decorator_1 = require("./../../common/decorators/user.decorator");
const parse_object_id_pipe_1 = require("./../../common/pipes/parse-object-id.pipe");
const parse_order_status_pipe_1 = require("./../../common/pipes/parse-order-status.pipe");
const parse_address_pipe_1 = require("./../../common/pipes/parse-address.pipe");
const parse_pincode_pipe_1 = require("./../../common/pipes/parse-pincode.pipe");
const parse_payment_id_pipe_1 = require("./../../common/pipes/parse-payment-id.pipe");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async getAll(response) {
        const ordersDocs = await this.ordersService.findAll();
        response.status(200).json(ordersDocs);
    }
    async getCount(response) {
        const count = await this.ordersService.findCount();
        response.status(200).json(count);
    }
    async udpateOrderStatus(orderId, status, response) {
        const updated = await this.ordersService.setOrderStatus(orderId, status);
        response.status(200).json(updated);
    }
    async getById(id, response) {
        const orderDoc = await this.ordersService.findById(id);
        response.status(200).json(orderDoc);
    }
    async createOrder(user, address, pincode, paymentId, response) {
        const created = await this.ordersService.transfromCart(user.id, {
            address,
            pincode,
            paymentId
        });
        response.status(200).json(created);
    }
    async getAllUserOrders(user, orderStatus, userOrderId, response) {
        const orders = await this.ordersService.findFiltred({
            user: user.id,
            status: orderStatus,
            id: userOrderId,
        });
        response.status(200).json(orders);
    }
    async countUserOrders(user, response) {
        const count = await this.ordersService.findCount(user.id);
        response.status(200).json(count);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/admin/all'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('/admin/count'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "getCount", null);
tslib_1.__decorate([
    (0, common_1.Put)('/admin/:orderId/update-status'),
    tslib_1.__param(0, (0, common_1.Param)('orderId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Query)('status', parse_order_status_pipe_1.ParseOrderStatusPipe)),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "udpateOrderStatus", null);
tslib_1.__decorate([
    (0, common_1.Get)('/admin/:orderId'),
    tslib_1.__param(0, (0, common_1.Param)('orderId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Post)('/create'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Body)('address', parse_address_pipe_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Body)('pincode', parse_pincode_pipe_1.ParsePincodePipe)),
    tslib_1.__param(3, (0, common_1.Body)('paymentId', parse_payment_id_pipe_1.ParsePaymentIdPipe)),
    tslib_1.__param(4, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
tslib_1.__decorate([
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Query)('status')),
    tslib_1.__param(2, (0, common_1.Query)('userOrderId')),
    tslib_1.__param(3, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "getAllUserOrders", null);
tslib_1.__decorate([
    (0, common_1.Get)('/count'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "countUserOrders", null);
OrdersController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map