"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const parse_object_id_pipe_1 = require("./../../common/pipes/parse-object-id.pipe");
const product_reviews_service_1 = require("./product-reviews/product-reviews.service");
const products_service_1 = require("./products.service");
const public_decorotor_1 = require("./../../common/decorators/public.decorotor");
const role_decorator_1 = require("./../../common/decorators/role.decorator");
const role_enum_1 = require("./../../common/enums/role.enum");
let ProductsController = class ProductsController {
    constructor(productsService, reviewsService) {
        this.productsService = productsService;
        this.reviewsService = reviewsService;
    }
    async findSome(query, response) {
        const execRes = await this.productsService.findFiltred(query);
        return response.status(200).json(execRes);
    }
    async productsCount(response) {
        const count = await this.productsService.productsCount();
        response.status(200).json({
            productsCount: count
        });
    }
    async create(data, response) {
        const execRes = await this.productsService.create(data);
        response.status(200).json(execRes);
    }
    async productById(id, response) {
        const doc = await this.productsService.findById(id);
        response.status(200).send(doc);
    }
    async productReviews(id, response) {
        const doc = await this.reviewsService.findByProductId(id);
        response.status(200).json(doc);
    }
    async createProductReviews(id, data, response) {
        if (id != data.prodcut) {
            return response.status(400);
        }
        const execRes = await this.reviewsService.createReview(data);
        return response.status(200).json(execRes);
    }
    async removeProductById(id, response) {
        const deleted = await this.productsService.remove(id);
        response.status(200).json(deleted);
    }
    async updateProductById(id, newData, response) {
        const execRes = await this.productsService.update(id, newData);
        response.status(200).json(execRes);
    }
};
tslib_1.__decorate([
    (0, public_decorotor_1.Public)(),
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "findSome", null);
tslib_1.__decorate([
    (0, public_decorotor_1.Public)(),
    (0, common_1.Get)('/count'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "productsCount", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)('/create'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
tslib_1.__decorate([
    (0, public_decorotor_1.Public)(),
    (0, common_1.Get)('/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "productById", null);
tslib_1.__decorate([
    (0, public_decorotor_1.Public)(),
    (0, common_1.Get)('/reviews/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "productReviews", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Post)('/reviews/:id/add'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "createProductReviews", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Delete)('/:id/delete'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "removeProductById", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Put)('/:id/update'),
    tslib_1.__param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProductById", null);
ProductsController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [products_service_1.ProductsService,
        product_reviews_service_1.ProductReviewsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map