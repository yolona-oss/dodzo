"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const image_upload_module_1 = require("./../../image-upload/image-upload.module");
const category_controller_1 = require("./category.controller");
const category_schema_1 = require("./schemas/category.schema");
const category_service_1 = require("./category.service");
const sub_category_controller_1 = require("./sub-category.controller");
const sub_category_schema_1 = require("./schemas/sub-category.schema");
const sub_category_service_1 = require("./sub-category.service");
let CategoryModule = class CategoryModule {
};
CategoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            image_upload_module_1.ImageUploadModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Category', schema: category_schema_1.CategorySchema },
                { name: 'SubCategory', schema: sub_category_schema_1.SubCategorySchema },
            ]),
        ],
        providers: [sub_category_service_1.SubCategoryService, category_service_1.CategoryService],
        exports: [sub_category_service_1.SubCategoryService, category_service_1.CategoryService],
        controllers: [category_controller_1.CategoryController, sub_category_controller_1.SubCategoryController]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=category.module.js.map