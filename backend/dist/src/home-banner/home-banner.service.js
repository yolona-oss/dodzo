"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeBannerService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
const mongoose_3 = require("mongoose");
const common_1 = require("@nestjs/common");
const image_upload_service_1 = require("./../image-upload/image-upload.service");
const app_error_1 = require("./../common/app-error");
let HomeBannerService = class HomeBannerService {
    constructor(homeBannerModel, imageUploadService) {
        this.homeBannerModel = homeBannerModel;
        this.imageUploadService = imageUploadService;
    }
    async findAll() {
        try {
            return await this.homeBannerModel.find().populate('images').exec();
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_READ, {
                errorMessage: JSON.stringify(error.errors, null, 4) || error
            });
        }
    }
    async findById(id) {
        try {
            const doc = await this.homeBannerModel.findById(id).populate('images').exec();
            if (!doc) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return doc;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
    }
    async createBanner(data) {
        const doc = await this.homeBannerModel.create(data);
        return await doc.populate('images');
    }
    async updateById(id, data) {
        const existed = await this.findById(id);
        for (const image in data.images) {
            if (!existed.images.includes(new mongoose_1.default.Types.ObjectId(image))) {
                try {
                    await this.imageUploadService.removeDocumentById(image.toString());
                }
                catch (e) { }
            }
        }
        return await this.homeBannerModel.findByIdAndUpdate(id, { images: data.images }, { new: true }).populate('images');
    }
    async removeById(id) {
        const doc = await this.homeBannerModel.findById(id);
        if (!doc) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        for (const image of doc.images) {
            await this.imageUploadService.removeDocumentById(image.toString());
        }
        return await this.homeBannerModel.findByIdAndDelete(id);
    }
};
HomeBannerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('HomeBanner')),
    tslib_1.__metadata("design:paramtypes", [mongoose_3.Model,
        image_upload_service_1.ImageUploadService])
], HomeBannerService);
exports.HomeBannerService = HomeBannerService;
//# sourceMappingURL=home-banner.service.js.map