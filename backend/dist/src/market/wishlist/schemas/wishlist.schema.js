"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistSchema = exports.WishlistEntity = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
let WishlistEntity = class WishlistEntity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    tslib_1.__metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], WishlistEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Product', required: true }),
    tslib_1.__metadata("design:type", Array)
], WishlistEntity.prototype, "products", void 0);
WishlistEntity = tslib_1.__decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true
        }
    })
], WishlistEntity);
exports.WishlistEntity = WishlistEntity;
const WishlistSchema = mongoose_1.SchemaFactory.createForClass(WishlistEntity);
exports.WishlistSchema = WishlistSchema;
WishlistSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//# sourceMappingURL=wishlist.schema.js.map