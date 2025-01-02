"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
exports.cloudinaryProvider = [
    {
        provide: 'CLOUDINARY',
        useFactory: (config) => {
            return cloudinary_1.v2.config({
                cloud_name: config.get("cloudinary.resolve_name"),
                api_key: config.get("cloudinary.api_key"),
                api_secret: config.get("cloudinary.api_secret")
            });
        },
        inject: [config_1.ConfigService]
    }
];
//# sourceMappingURL=cloudinary.provider.js.map