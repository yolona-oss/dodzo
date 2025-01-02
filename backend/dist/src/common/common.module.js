"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const cities_module_1 = require("./cities/cities.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
let CommonModule = class CommonModule {
};
CommonModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cities_module_1.CitiesModule, cloudinary_module_1.CloudinaryModule],
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map