"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeBannerSchema = exports.HomeBannerEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
let HomeBannerEntity = class HomeBannerEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'Title' }),
    tslib_1.__metadata("design:type", String)
], HomeBannerEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Images', required: true }),
    tslib_1.__metadata("design:type", Array)
], HomeBannerEntity.prototype, "images", void 0);
HomeBannerEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true
        }
    })
], HomeBannerEntity);
exports.HomeBannerEntity = HomeBannerEntity;
const HomeBannerSchema = mongoose_1.SchemaFactory.createForClass(HomeBannerEntity);
exports.HomeBannerSchema = HomeBannerSchema;
HomeBannerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=home-banner.schema.js.map