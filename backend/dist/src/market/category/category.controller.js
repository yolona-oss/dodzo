"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const parse_object_id_pipe_1 = require("./../../common/pipes/parse-object-id.pipe");
const category_service_1 = require("./category.service");
const app_error_1 = require("./../../common/app-error");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async findSome(query, response) {
        const result = await this.categoryService.findFiltredWrapper(query);
        response.status(200).json(result);
    }
    async getCategoryEntriesCount(response) {
        const count = await this.categoryService.getDocumentsCount();
        response.status(200).json(count);
    }
    async createCategory(body, response) {
        const category = await this.categoryService.createDocument({
            name: body.name,
            images: body.images,
            color: body.color
        });
        if (!category) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE);
        }
        response.status(200).json(category);
    }
    async getCategoryById(id, response) {
        const category = await this.categoryService.getDocumentById(id);
        response.status(200).json(category);
    }
    async removeById(id, response) {
        await this.categoryService.removeDocumentById(id);
        response.status(200).json({
            success: true,
        });
    }
    async updateById(id, body, response) {
        const updatedCat = await this.categoryService.updateDocumentById(id, {
            name: body.name,
            images: body.images?.map(id => new mongoose_1.default.Types.ObjectId(id)),
            color: body.color
        });
        response.status(200).json(updatedCat);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "findSome", null);
tslib_1.__decorate([
    (0, common_1.Get)('/count'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryEntriesCount", null);
tslib_1.__decorate([
    (0, common_1.Post)('/create'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryById", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "removeById", null);
tslib_1.__decorate([
    (0, common_1.Put)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateById", null);
CategoryController = tslib_1.__decorate([
    (0, common_1.Controller)('category'),
    tslib_1.__metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map