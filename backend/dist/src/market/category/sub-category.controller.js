"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const sub_category_service_1 = require("./sub-category.service");
const app_error_1 = require("./../../common/app-error");
const parse_object_id_pipe_1 = require("./../../common/pipes/parse-object-id.pipe");
let SubCategoryController = class SubCategoryController {
    constructor(subCategoryService) {
        this.subCategoryService = subCategoryService;
    }
    async findSome(query, response) {
        const result = await this.subCategoryService.findFiltredWrapper(query);
        response.status(200).json(result);
    }
    async count(response) {
        const subCatCount = await this.subCategoryService.getDocumentsCount();
        response.status(200).json(subCatCount);
    }
    async create(body, response) {
        console.log(body);
        if (!mongoose_1.default.isValidObjectId(body.category)) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_OBJECT_ID);
        }
        try {
            const subCat = await this.subCategoryService.createDocument({
                category: body.category,
                subCat: body.subCat
            });
            if (!subCat) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE);
            }
            response.status(200).json(subCat);
        }
        catch (e) {
            if (e instanceof app_error_1.AppError) {
                throw e;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE);
        }
    }
    async getById(id, response) {
        const subCategory = await this.subCategoryService.getDocumentById(id);
        response.status(200).json(subCategory);
    }
    async remove(id, response) {
        await this.subCategoryService.removeDocumentById(id);
        response.status(200).json({
            success: true,
        });
    }
    async updateById(id, body, response) {
        if (!mongoose_1.default.isValidObjectId(body.category)) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_OBJECT_ID);
        }
        const subCat = await this.subCategoryService.updateDocumentById(id, {
            category: body.category,
            subCat: body.subCat,
        });
        if (!subCat) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE);
        }
        response.status(200).json(subCat);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "findSome", null);
tslib_1.__decorate([
    (0, common_1.Get)('/count'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "count", null);
tslib_1.__decorate([
    (0, common_1.Post)('/create'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Put)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SubCategoryController.prototype, "updateById", null);
SubCategoryController = tslib_1.__decorate([
    (0, common_1.Controller)('sub-category'),
    tslib_1.__metadata("design:paramtypes", [sub_category_service_1.SubCategoryService])
], SubCategoryController);
exports.SubCategoryController = SubCategoryController;
//# sourceMappingURL=sub-category.controller.js.map