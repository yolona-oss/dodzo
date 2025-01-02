"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const image_upload_service_1 = require("./image-upload.service");
const app_error_1 = require("./../common/app-error");
const parse_object_id_pipe_1 = require("./../common/pipes/parse-object-id.pipe");
const utils_1 = require("./../common/misc/utils");
let ImageUploadController = class ImageUploadController {
    constructor(imageUploadService) {
        this.imageUploadService = imageUploadService;
    }
    async upload(files, res) {
        if (!files) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.CANNOT_UPLOAD_IMAGE, {
                errorMessage: "No files attached",
                userMessage: "No files attached"
            });
        }
        const jsonRes = await this.imageUploadService.uploadImages(files);
        res.status(200).json(jsonRes);
    }
    async all(response) {
        const entries = await this.imageUploadService.getAllDocuments();
        response.status(200).json(entries);
    }
    async get(id, response) {
        const entry = await this.imageUploadService.getDocumentById(id);
        if (entry) {
            response.status(200).send(entry);
        }
        throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
    }
    async remove(id, response) {
        const execRes = await this.imageUploadService.removeDocumentById(id);
        if (execRes) {
            return response.status(200).json({ success: true });
        }
        throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("images", 20, {
        storage: (0, multer_1.diskStorage)({
            destination: (_, __, cb) => cb(null, './uploads'),
            filename: (_, file, cb) => cb(null, `${(0, utils_1.generateRandom)()}_${file.originalname}`)
        })
    })),
    tslib_1.__param(0, (0, common_1.UploadedFiles)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageUploadController.prototype, "upload", null);
tslib_1.__decorate([
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageUploadController.prototype, "all", null);
tslib_1.__decorate([
    (0, common_1.Get)('/id/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageUploadController.prototype, "get", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImageUploadController.prototype, "remove", null);
ImageUploadController = tslib_1.__decorate([
    (0, common_1.Controller)('image-upload'),
    tslib_1.__metadata("design:paramtypes", [image_upload_service_1.ImageUploadService])
], ImageUploadController);
exports.ImageUploadController = ImageUploadController;
//# sourceMappingURL=image-upload.controller.js.map