"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const fs = tslib_1.__importStar(require("fs"));
const cloudinary_service_1 = require("./../common/cloudinary/cloudinary.service");
const crud_service_1 = require("./../common/misc/crud-service");
const app_error_1 = require("./../common/app-error");
const utils_1 = require("./../common/misc/utils");
const default_images_enum_1 = require("./../common/enums/default-images.enum");
let ImageUploadService = class ImageUploadService extends crud_service_1.CRUDService {
    constructor(imagesModel, cloudinaryService) {
        super(imagesModel);
        this.imagesModel = imagesModel;
        this.cloudinaryService = cloudinaryService;
    }
    async uploadImages(files, blankType) {
        const cloudinaryUploadedUrls = new Array;
        const imageDocs = new Array;
        const cloudinaryUploadOptions = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };
        for (const file of files) {
            try {
                const uploadedFile = await this.cloudinaryService.uploadFile(file.path, cloudinaryUploadOptions);
                cloudinaryUploadedUrls.push(uploadedFile.secure_url);
                imageDocs.push(await super.createDocument({ imageUrl: uploadedFile.secure_url, blankType: blankType }));
            }
            finally {
                if (!blankType) {
                    fs.unlinkSync(file.path);
                }
            }
        }
        return imageDocs;
    }
    async findBlank(type) {
        try {
            const doc = await this.imagesModel.findOne({ blankType: default_images_enum_1.DefaultImages[type] });
            if (!doc) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return doc;
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
    }
    async removeDocumentById(id) {
        const imageDoc = await super.getDocumentById(id);
        await this.cloudinaryService.destroyFile((0, utils_1.extractFileName)(imageDoc.imageUrl));
        return await super.removeDocumentById(id);
    }
    async removeMany(ids) {
        ids.forEach(id => {
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_OBJECT_ID);
            }
        });
        const images = await this.imagesModel.find({ _id: { $in: ids } }).exec();
        if (!images) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        const cloudinaryIds = images.map(image => (0, utils_1.extractFileName)(image.imageUrl));
        for (let i = 0; i < images.length; ++i) {
            await this.cloudinaryService.destroyFile(cloudinaryIds[i]);
            await this.removeDocumentById(ids[i]);
        }
    }
    async isImageUploaded(url) {
        const docs = await super.getAllDocuments();
        if (!docs) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        for (const doc of docs) {
            if (doc.imageUrl == url) {
                return doc;
            }
        }
        return null;
    }
    async createDocument(data) {
        throw new Error("Use ImageUploadService::uploadImages instead");
        return super.createDocument(data);
    }
    async __createDefaultBlankImages(localPaths) {
        for (const type in default_images_enum_1.DefaultImages) {
            const isBlankExists = await this.imagesModel.find({ blankType: type });
            if (isBlankExists.length > 0) {
                continue;
            }
            const fileToUpload = localPaths.filter(path => path.type == type)
                .map(path => {
                return {
                    path: path.path,
                    filename: (0, utils_1.extractFileName)(path.path, false)
                };
            });
            await this.uploadImages(fileToUpload, type);
        }
    }
};
ImageUploadService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('Images')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.Model,
        cloudinary_service_1.CloudinaryService])
], ImageUploadService);
exports.ImageUploadService = ImageUploadService;
//# sourceMappingURL=image-upload.service.js.map