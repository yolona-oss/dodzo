"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersSchema = exports.OrdersEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
const order_status_enum_1 = require("./../../../common/enums/order-status.enum");
let OrdersEntity = class OrdersEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], OrdersEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [{
                product: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, default: 1 }
            }], required: true }),
    tslib_1.__metadata("design:type", Array)
], OrdersEntity.prototype, "products", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, default: order_status_enum_1.OrderStatus.Pending }),
    tslib_1.__metadata("design:type", String)
], OrdersEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], OrdersEntity.prototype, "address", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], OrdersEntity.prototype, "pincode", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], OrdersEntity.prototype, "paymentId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    tslib_1.__metadata("design:type", Date)
], OrdersEntity.prototype, "creationData", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    tslib_1.__metadata("design:type", Date)
], OrdersEntity.prototype, "closingData", void 0);
OrdersEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true
        }
    })
], OrdersEntity);
exports.OrdersEntity = OrdersEntity;
const OrdersSchema = mongoose_1.SchemaFactory.createForClass(OrdersEntity);
exports.OrdersSchema = OrdersSchema;
OrdersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=orders.schema.js.map