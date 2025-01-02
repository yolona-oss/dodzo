"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewsService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const app_error_1 = require("./../../../common/app-error");
let ProductReviewsService = class ProductReviewsService {
    constructor(productReviewsModel) {
        this.productReviewsModel = productReviewsModel;
    }
    async findAll() {
        return await this.productReviewsModel.find().populate('product').exec() || [];
    }
    async findById(id) {
        try {
            const doc = await this.productReviewsModel.findById(id).populate('product').exec();
            if (!doc) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return doc;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
    }
    async findCount() {
        return await this.productReviewsModel.countDocuments() || 0;
    }
    async findUserReviews(userId) {
        return await this.productReviewsModel.find({ user: userId })
            .populate('product').exec() || [];
    }
    async findByProductId(productId) {
        return await this.productReviewsModel.find({ product: productId }).populate('product').exec() || [];
    }
    async createReview(data) {
        try {
            const doc = await this.productReviewsModel.create(data);
            if (!doc) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE);
            }
            return doc;
        }
        catch (error) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE, {
                errorMessage: JSON.stringify(error)
            });
        }
    }
};
ProductReviewsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('ProductReviews')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.Model])
], ProductReviewsService);
exports.ProductReviewsService = ProductReviewsService;
//# sourceMappingURL=product-reviews.service.js.map