"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cloudinary_provider_1 = require("./cloudinary.provider");
const cloudinary_service_1 = require("./cloudinary.service");
let CloudinaryModule = class CloudinaryModule {
};
CloudinaryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [...cloudinary_provider_1.cloudinaryProvider, cloudinary_service_1.CloudinaryService],
        exports: [...cloudinary_provider_1.cloudinaryProvider, cloudinary_service_1.CloudinaryService]
    })
], CloudinaryModule);
exports.CloudinaryModule = CloudinaryModule;
//# sourceMappingURL=cloudinary.module.js.map