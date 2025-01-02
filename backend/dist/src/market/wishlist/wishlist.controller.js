"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("./wishlist.service");
const parse_object_id_pipe_1 = require("./../../common/pipes/parse-object-id.pipe");
const user_decorator_1 = require("./../../common/decorators/user.decorator");
let WishlistController = class WishlistController {
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    async get(query, response) {
        const docs = await this.wishlistService.findFiltredWrapper(query);
        response.status(200).json(docs);
    }
    async getUserWishlist(user, response) {
        const doc = await this.wishlistService.findByUser(user.id);
        response.status(200).json(doc);
    }
    async isContainsProduct(user, productId, response) {
        const isAdded = await this.wishlistService.isContainsProduct(user.id, productId);
        response.status(200).json({ isAdded: isAdded });
    }
    async addToWishlist(user, productId, response) {
        const doc = await this.wishlistService.addToWishlist(user.id, productId);
        response.status(200).json(doc);
    }
    async removeFromWishlist(user, productId, response) {
        const doc = await this.wishlistService.removeFromWishlist(user.id, productId);
        response.status(200).json(doc);
    }
    async clearWishlist(user, response) {
        const doc = await this.wishlistService.clearWishlist(user.id);
        response.status(200).json(doc);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/all'),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WishlistController.prototype, "get", null);
tslib_1.__decorate([
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WishlistController.prototype, "getUserWishlist", null);
tslib_1.__decorate([
    (0, common_1.Get)('/is-added'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Query)('productId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WishlistController.prototype, "isContainsProduct", null);
tslib_1.__decorate([
    (0, common_1.Put)('/add'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Query)('productId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WishlistController.prototype, "addToWishlist", null);
tslib_1.__decorate([
    (0, common_1.Put)('/remove'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Query)('productId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WishlistController.prototype, "removeFromWishlist", null);
tslib_1.__decorate([
    (0, common_1.Put)('/clear'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WishlistController.prototype, "clearWishlist", null);
WishlistController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
exports.WishlistController = WishlistController;
//# sourceMappingURL=wishlist.controller.js.map