"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const wishlist_service_1 = require("./wishlist.service");
const wishlist_controller_1 = require("./wishlist.controller");
const wishlist_schema_1 = require("./schemas/wishlist.schema");
const products_schema_1 = require("../products/schemas/products.schema");
const user_schema_1 = require("../../users/schemas/user.schema");
let WishlistModule = class WishlistModule {
};
WishlistModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Wishlist', schema: wishlist_schema_1.WishlistSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Product', schema: products_schema_1.ProductSchema }
            ])
        ],
        controllers: [wishlist_controller_1.WishlistController],
        providers: [wishlist_service_1.WishlistService],
        exports: [wishlist_service_1.WishlistService]
    })
], WishlistModule);
exports.WishlistModule = WishlistModule;
//# sourceMappingURL=wishlist.module.js.map