"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeBannerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const image_upload_module_1 = require("./../image-upload/image-upload.module");
const home_banner_controller_1 = require("./home-banner.controller");
const home_banner_schema_1 = require("./schemas/home-banner.schema");
const home_banner_service_1 = require("./home-banner.service");
let HomeBannerModule = class HomeBannerModule {
};
HomeBannerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [home_banner_controller_1.HomeBannerController],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'HomeBanner', schema: home_banner_schema_1.HomeBannerSchema },
            ]),
            image_upload_module_1.ImageUploadModule
        ],
        providers: [home_banner_service_1.HomeBannerService]
    })
], HomeBannerModule);
exports.HomeBannerModule = HomeBannerModule;
//# sourceMappingURL=home-banner.module.js.map