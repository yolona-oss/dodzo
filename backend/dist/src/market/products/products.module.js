"use strict";
var ProductsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const image_upload_module_1 = require("./../../image-upload/image-upload.module");
const category_module_1 = require("./../category/category.module");
const category_schema_1 = require("./../category/schemas/category.schema");
const sub_category_schema_1 = require("./../category/schemas/sub-category.schema");
const product_reviews_module_1 = require("./product-reviews/product-reviews.module");
const products_controller_1 = require("./products.controller");
const products_schema_1 = require("./schemas/products.schema");
const products_service_1 = require("./products.service");
let ProductsModule = ProductsModule_1 = class ProductsModule {
};
ProductsModule = ProductsModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Product', schema: products_schema_1.ProductSchema },
                { name: 'Category', schema: category_schema_1.CategorySchema },
                { name: 'SubCategory', schema: sub_category_schema_1.SubCategorySchema },
            ]),
            core_1.RouterModule.register([
                {
                    path: 'products',
                    module: ProductsModule_1,
                }
            ]),
            product_reviews_module_1.ProductReviewsModule,
            category_module_1.CategoryModule,
            image_upload_module_1.ImageUploadModule,
        ],
        providers: [products_service_1.ProductsService],
        controllers: [products_controller_1.ProductsController],
        exports: [products_service_1.ProductsService]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map