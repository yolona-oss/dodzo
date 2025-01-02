"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeBannerController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const home_banner_service_1 = require("./home-banner.service");
const parse_object_id_pipe_1 = require("./../common/pipes/parse-object-id.pipe");
let HomeBannerController = class HomeBannerController {
    constructor(homeBannerService) {
        this.homeBannerService = homeBannerService;
    }
    async all(response) {
        const entries = await this.homeBannerService.findAll();
        return response.status(200).json(entries);
    }
    async create(body, response) {
        await this.homeBannerService.createBanner({
            images: body.images
        });
        response.status(200).json({});
    }
    async get(id, response) {
        const doc = await this.homeBannerService.findById(id);
        return response.status(200).send(doc);
    }
    async remove(id, response) {
        await this.homeBannerService.removeById(id);
        return response.status(200).json({ success: true, message: "Slide deleted" });
    }
    async update(id, body, response) {
        const updatedDoc = await this.homeBannerService.updateById(id, {
            images: body.images
        });
        return response.status(200).json(updatedDoc);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], HomeBannerController.prototype, "all", null);
tslib_1.__decorate([
    (0, common_1.Post)('/create'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], HomeBannerController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], HomeBannerController.prototype, "get", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], HomeBannerController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], HomeBannerController.prototype, "update", null);
HomeBannerController = tslib_1.__decorate([
    (0, common_1.Controller)('home-banner'),
    tslib_1.__metadata("design:paramtypes", [home_banner_service_1.HomeBannerService])
], HomeBannerController);
exports.HomeBannerController = HomeBannerController;
//# sourceMappingURL=home-banner.controller.js.map