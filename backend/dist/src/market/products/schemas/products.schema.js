"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.ProductEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
let ProductEntity = class ProductEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Images', required: true }),
    tslib_1.__metadata("design:type", Array)
], ProductEntity.prototype, "images", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    tslib_1.__metadata("design:type", String)
], ProductEntity.prototype, "brand", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ProductEntity.prototype, "oldPrice", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Category', required: true }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], ProductEntity.prototype, "category", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'SubCategory' }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], ProductEntity.prototype, "subCategory", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    tslib_1.__metadata("design:type", Number)
], ProductEntity.prototype, "countInStock", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ProductEntity.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], ProductEntity.prototype, "isFeatured", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    tslib_1.__metadata("design:type", Number)
], ProductEntity.prototype, "discount", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], ProductEntity.prototype, "rams", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], ProductEntity.prototype, "size", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    tslib_1.__metadata("design:type", Array)
], ProductEntity.prototype, "weight", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], ProductEntity.prototype, "location", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    tslib_1.__metadata("design:type", Date)
], ProductEntity.prototype, "dateCreated", void 0);
ProductEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true
        }
    })
], ProductEntity);
exports.ProductEntity = ProductEntity;
const ProductSchema = mongoose_1.SchemaFactory.createForClass(ProductEntity);
exports.ProductSchema = ProductSchema;
ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=products.schema.js.map