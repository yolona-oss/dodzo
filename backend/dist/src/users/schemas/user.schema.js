"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.UserEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
const role_enum_1 = require("./../../common/enums/role.enum");
let UserEntity = class UserEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "images", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true, default: role_enum_1.Role.User }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Cart', required: false }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], UserEntity.prototype, "cart", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Orders', required: false }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "orders", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Wishlist', required: false }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], UserEntity.prototype, "wishlist", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'ProductReviews', required: false }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "reviews", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [{ token: { type: String, required: true } }], required: false }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "tokens", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "resetPasswordToken", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    tslib_1.__metadata("design:type", Date)
], UserEntity.prototype, "resetPasswordTokenExpiry", void 0);
UserEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true,
            transform(_, ret) {
                delete ret.password;
                delete ret.tokens;
                return ret;
            }
        }
    })
], UserEntity);
exports.UserEntity = UserEntity;
const UserSchema = mongoose_1.SchemaFactory.createForClass(UserEntity);
exports.UserSchema = UserSchema;
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=user.schema.js.map