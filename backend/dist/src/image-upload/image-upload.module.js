"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const path_1 = tslib_1.__importDefault(require("path"));
const image_upload_service_1 = require("./image-upload.service");
const cloudinary_module_1 = require("./../common/cloudinary/cloudinary.module");
const image_upload_controller_1 = require("./image-upload.controller");
const image_upload_schema_1 = require("./schemas/image-upload.schema");
let ImageUploadModule = class ImageUploadModule {
    constructor(imagesService, configService) {
        this.imagesService = imagesService;
        this.configService = configService;
    }
    async onApplicationBootstrap() {
        const userImage = {
            path: path_1.default.join(__dirname, '..', '..', '..', String(this.configService.getOrThrow('blank_images.user'))),
            type: "User"
        };
        const productImage = {
            path: path_1.default.join(__dirname, '..', '..', '..', String(this.configService.getOrThrow('blank_images.product'))),
            type: "Product"
        };
        await this.imagesService.__createDefaultBlankImages([userImage, productImage]);
    }
};
ImageUploadModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Images', schema: image_upload_schema_1.ImagesSchema }
            ]),
            cloudinary_module_1.CloudinaryModule
        ],
        providers: [image_upload_service_1.ImageUploadService],
        controllers: [image_upload_controller_1.ImageUploadController],
        exports: [image_upload_service_1.ImageUploadService]
    }),
    tslib_1.__metadata("design:paramtypes", [image_upload_service_1.ImageUploadService,
        config_1.ConfigService])
], ImageUploadModule);
exports.ImageUploadModule = ImageUploadModule;
//# sourceMappingURL=image-upload.module.js.map