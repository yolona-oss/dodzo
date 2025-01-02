"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategorySchema = exports.SubCategoryEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
let SubCategoryEntity = class SubCategoryEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Category', required: true }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], SubCategoryEntity.prototype, "category", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], SubCategoryEntity.prototype, "name", void 0);
SubCategoryEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true
        }
    })
], SubCategoryEntity);
exports.SubCategoryEntity = SubCategoryEntity;
const SubCategorySchema = mongoose_1.SchemaFactory.createForClass(SubCategoryEntity);
exports.SubCategorySchema = SubCategorySchema;
SubCategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=sub-category.schema.js.map