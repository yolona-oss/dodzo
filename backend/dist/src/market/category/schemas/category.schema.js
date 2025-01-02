"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = exports.CategoryEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
let CategoryEntity = class CategoryEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Images', required: true }),
    tslib_1.__metadata("design:type", Array)
], CategoryEntity.prototype, "images", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], CategoryEntity.prototype, "color", void 0);
CategoryEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true
        }
    })
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
const CategorySchema = mongoose_1.SchemaFactory.createForClass(CategoryEntity);
exports.CategorySchema = CategorySchema;
CategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=category.schema.js.map