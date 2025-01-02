"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewsSchema = exports.ProductReviewsEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
let ProductReviewsEntity = class ProductReviewsEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Products', required: true }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], ProductReviewsEntity.prototype, "product", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Users', required: true }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], ProductReviewsEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: "" }),
    tslib_1.__metadata("design:type", String)
], ProductReviewsEntity.prototype, "review", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, default: 1 }),
    tslib_1.__metadata("design:type", Number)
], ProductReviewsEntity.prototype, "customerRating", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    tslib_1.__metadata("design:type", Date)
], ProductReviewsEntity.prototype, "dateCreated", void 0);
ProductReviewsEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true
        }
    })
], ProductReviewsEntity);
exports.ProductReviewsEntity = ProductReviewsEntity;
const ProductReviewsSchema = mongoose_1.SchemaFactory.createForClass(ProductReviewsEntity);
exports.ProductReviewsSchema = ProductReviewsSchema;
ProductReviewsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=product-reviews.schema.js.map