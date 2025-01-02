"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = exports.CartEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
let CartEntity = class CartEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], CartEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [{
                product: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, default: 1 }
            }], required: true }),
    tslib_1.__metadata("design:type", Array)
], CartEntity.prototype, "products", void 0);
CartEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true
        }
    })
], CartEntity);
exports.CartEntity = CartEntity;
const CartSchema = mongoose_1.SchemaFactory.createForClass(CartEntity);
exports.CartSchema = CartSchema;
CartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=cart.schema.js.map