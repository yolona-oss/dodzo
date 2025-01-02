"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const fs = tslib_1.__importStar(require("fs"));
const config_1 = require("@nestjs/config");
let CitiesService = class CitiesService {
    constructor(configService) {
        this.configService = configService;
    }
    async getAll() {
        const data_path = this.configService.get('static_data_storage.cities_file');
        if (!fs.existsSync(data_path)) {
            throw new Error("Cities file dont exists");
        }
        const parsed = JSON.parse(fs.readFileSync(data_path).toString());
        return parsed;
    }
};
CitiesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], CitiesService);
exports.CitiesService = CitiesService;
//# sourceMappingURL=cities.service.js.map