"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const crud_service_1 = require("./../../common/misc/crud-service");
const opq_builder_1 = require("./../../common/misc/opq-builder");
const app_error_1 = require("./../../common/app-error");
let SubCategoryService = class SubCategoryService extends crud_service_1.CRUDService {
    constructor(subCategoryModel, categoryModel) {
        super(subCategoryModel);
        this.subCategoryModel = subCategoryModel;
        this.categoryModel = categoryModel;
    }
    async findFiltredWrapper(opts) {
        const page = opts.page ? parseInt(opts.page) : 1;
        const perPage = opts.perPage ? parseInt(opts.perPage) : undefined;
        const totalDocuments = await this.subCategoryModel.countDocuments();
        const totalPages = +Math.ceil(totalDocuments / (perPage || 1));
        if (totalDocuments === 0) {
            return {
                subCategoryList: [],
                totalPages: 0,
                page: 0
            };
        }
        if (page > totalPages) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_RANGE);
        }
        const query = new opq_builder_1.OPQBuilder()
            .build();
        const docs = await this.subCategoryModel.find(query, null, { skip: (page - 1) * (perPage || 0), limit: perPage }).populate({
            path: 'category',
            model: this.categoryModel,
            populate: {
                path: 'images'
            }
        }).exec();
        if (!docs) {
            new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return {
            subCategoryList: docs,
            totalPages: totalPages,
            page: page
        };
    }
    async getAllDocuments() {
        return await this.subCategoryModel.find().populate("category").exec();
    }
};
SubCategoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('SubCategory')),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)('Category')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], SubCategoryService);
exports.SubCategoryService = SubCategoryService;
//# sourceMappingURL=sub-category.service.js.map