"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const image_upload_service_1 = require("./../../image-upload/image-upload.service");
const crud_service_1 = require("./../../common/misc/crud-service");
const app_error_1 = require("./../../common/app-error");
const opq_builder_1 = require("./../../common/misc/opq-builder");
let CategoryService = class CategoryService extends crud_service_1.CRUDService {
    constructor(categoryModel, subCategoryModel, imageUploadService) {
        super(categoryModel);
        this.categoryModel = categoryModel;
        this.subCategoryModel = subCategoryModel;
        this.imageUploadService = imageUploadService;
    }
    async findFiltredWrapper(opts) {
        const page = opts.page ? parseInt(opts.page) : 1;
        const perPage = opts.perPage ? parseInt(opts.perPage) : undefined;
        const totalDocuments = await this.categoryModel.countDocuments();
        const totalPages = +Math.ceil(totalDocuments / (perPage || 1));
        if (totalDocuments === 0) {
            return {
                categoryList: [],
                totalPages: 0,
                page: 0
            };
        }
        if (page > totalPages) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_RANGE);
        }
        const query = new opq_builder_1.OPQBuilder()
            .build();
        const docs = await this.categoryModel
            .find(query, null, { skip: (page - 1) * (perPage || 0), limit: perPage })
            .populate('images', 'imageUrl').exec();
        if (!docs) {
            new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return {
            categoryList: docs,
            totalPages: totalPages,
            page: page
        };
    }
    async getDocumentById(id) {
        const doc = await this.categoryModel.findById(id).populate('images').exec();
        if (!doc) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return doc;
    }
    async createDocument(data) {
        try {
            return await super.createDocument(data);
        }
        catch (error) {
            await this.imageUploadService.removeMany(data.images.map(id => id.toString()));
            throw error;
        }
    }
    async updateDocumentById(id, newData) {
        const existed = await super.getDocumentById(id);
        for (const image in newData.images) {
            if (!existed.images.includes(new mongoose_1.default.Types.ObjectId(image))) {
                try {
                    await this.imageUploadService.removeDocumentById(image.toString());
                }
                catch (e) { }
            }
        }
        return await super.updateDocumentById(id, newData);
    }
    async removeDocumentById(id) {
        const doc = await super.getDocumentById(id);
        for (const image of doc.images) {
            await this.imageUploadService.removeDocumentById(image.toString());
        }
        await this.subCategoryModel.deleteMany({ category: id });
        return super.removeDocumentById(id);
    }
};
CategoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('Category')),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)('SubCategory')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        image_upload_service_1.ImageUploadService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map