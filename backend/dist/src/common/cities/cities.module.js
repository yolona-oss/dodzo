"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cities_controller_1 = require("./cities.controller");
const cities_service_1 = require("./cities.service");
let CitiesModule = class CitiesModule {
};
CitiesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [cities_service_1.CitiesService],
        controllers: [cities_controller_1.CitiesController],
    })
], CitiesModule);
exports.CitiesModule = CitiesModule;
//# sourceMappingURL=cities.module.js.map