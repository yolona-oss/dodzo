"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cities_service_1 = require("./cities.service");
let CitiesController = class CitiesController {
    constructor(citiesService) {
        this.citiesService = citiesService;
    }
    async getAllCities() {
        return this.citiesService.getAll();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CitiesController.prototype, "getAllCities", null);
CitiesController = tslib_1.__decorate([
    (0, common_1.Controller)('cities'),
    tslib_1.__metadata("design:paramtypes", [cities_service_1.CitiesService])
], CitiesController);
exports.CitiesController = CitiesController;
//# sourceMappingURL=cities.controller.js.map