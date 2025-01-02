"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_reviews_service_1 = require("./product-reviews.service");
const product_reviews_schema_1 = require("./schemas/product-reviews.schema");
const user_schema_1 = require("./../../../users/schemas/user.schema");
const products_schema_1 = require("./../schemas/products.schema");
let ProductReviewsModule = class ProductReviewsModule {
};
ProductReviewsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'ProductReviews', schema: product_reviews_schema_1.ProductReviewsSchema },
                { name: 'Users', schema: user_schema_1.UserSchema },
                { name: 'Products', schema: products_schema_1.ProductSchema },
            ])
        ],
        providers: [product_reviews_service_1.ProductReviewsService],
        exports: [product_reviews_service_1.ProductReviewsService],
    })
], ProductReviewsModule);
exports.ProductReviewsModule = ProductReviewsModule;
//# sourceMappingURL=product-reviews.module.js.map