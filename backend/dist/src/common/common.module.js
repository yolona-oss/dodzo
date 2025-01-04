"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const image_upload_module_1 = require("./image-upload/image-upload.module");
let CommonModule = class CommonModule {
};
CommonModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            image_upload_module_1.ImageUploadModule,
        ],
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map