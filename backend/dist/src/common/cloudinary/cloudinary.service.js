"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const app_error_1 = require("./../app-error");
let CloudinaryService = class CloudinaryService {
    async uploadFile(file_path, options) {
        try {
            const promise = new Promise((res, rej) => {
                cloudinary_1.v2.uploader.upload(file_path, options, (error, result) => {
                    if (error) {
                        rej(error);
                    }
                    res(result);
                });
            });
            return await promise;
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.CLOUDINARY_ERROR, {
                errorMessage: "Cloudinary upload error: " + error.message,
                userMessage: "Cloudinary upload error"
            });
        }
    }
    async destroyFile(public_id) {
        try {
            const promise = new Promise((res, rej) => {
                cloudinary_1.v2.uploader.destroy(public_id, (error, result) => {
                    if (error) {
                        rej(error);
                    }
                    res(result);
                });
            });
            return await promise;
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.CLOUDINARY_ERROR, {
                errorMessage: "Cloudinary destroy error: " + error.message
            });
        }
    }
};
CloudinaryService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map