"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = tslib_1.__importStar(require("mongoose"));
const opq_builder_1 = require("./../../common/misc/opq-builder");
const app_error_1 = require("./../../common/app-error");
let WishlistService = class WishlistService {
    constructor(wishlistModel) {
        this.wishlistModel = wishlistModel;
    }
    async findById(id) {
        const doc = await this.wishlistModel.findById(id).populate('products').exec();
        if (!doc) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return doc;
    }
    async findAll() {
        const docs = await this.wishlistModel.find().populate('products').exec();
        if (!docs) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return docs;
    }
    async findCount() {
        const count = await this.wishlistModel.countDocuments();
        return count;
    }
    async findByUser(userId) {
        const userList = await this.wishlistModel.findOne({ user: userId }).exec();
        if (!userList) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return await userList.populate('products');
    }
    async isContainsProduct(userId, productId) {
        const doc = await this.wishlistModel.find({ user: userId, products: { $in: [productId] } }).populate('products').exec();
        if (!doc) {
            return false;
        }
        return true;
    }
    async findFiltredWrapper(query) {
        const dbQuery = new opq_builder_1.OPQBuilder()
            .from({})
            .addToQuery('user', query.user)
            .addToQuery('products', query.product)
            .build();
        const docs = await this.wishlistModel.find(dbQuery).populate('products').exec();
        if (!docs) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return docs;
    }
    async create(userId, productIds) {
        const created = await this.wishlistModel.create({ user: userId, products: productIds });
        if (!created) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE);
        }
        return created;
    }
    async addToWishlist(userId, productId) {
        const updated = await this.wishlistModel.findOneAndUpdate({ user: userId }, {
            $addToSet: {
                products: new mongoose_2.default.Types.ObjectId(productId)
            }
        }, { new: true });
        if (!updated) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE);
        }
        return await updated.populate('products');
    }
    async removeFromWishlist(userId, productId) {
        const updated = await this.wishlistModel.findOneAndUpdate({ user: userId }, {
            $pull: {
                products: new mongoose_2.default.Types.ObjectId(productId)
            }
        }, { new: true });
        if (!updated) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE);
        }
        return await updated.populate('products');
    }
    async clearWishlist(userId) {
        const deleted = await this.wishlistModel.findOneAndUpdate({ user: userId }, {
            $set: {
                products: []
            }
        }, { new: true });
    }
    async removeUserWishlist(userId) {
        const deleted = await this.wishlistModel.findOneAndDelete({ user: userId });
        if (!deleted) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_DELETE);
        }
        return deleted;
    }
};
WishlistService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('Wishlist')),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model])
], WishlistService);
exports.WishlistService = WishlistService;
//# sourceMappingURL=wishlist.service.js.map