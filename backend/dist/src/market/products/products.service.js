"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const category_service_1 = require("./../category/category.service");
const image_upload_service_1 = require("./../../image-upload/image-upload.service");
const app_error_1 = require("./../../common/app-error");
const opq_builder_1 = require("./../../common/misc/opq-builder");
let ProductsService = class ProductsService {
    constructor(model, category, imagesService) {
        this.model = model;
        this.category = category;
        this.imagesService = imagesService;
    }
    async findAll() {
        return (await this.model.find()
            .populate('images')
            .populate("category")
            .populate("subCategory").exec()) || [];
    }
    async findById(id) {
        const doc = await this.model.findById(id)
            .populate("category")
            .populate("subCategory")
            .populate("images")
            .exec();
        if (!doc) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return doc;
    }
    async findOne(query) {
        return (await this.model.find(query)
            .populate('images')
            .populate("category")
            .populate("subCategory")
            .exec());
    }
    async findFiltred(opts) {
        const page = opts.page ? parseInt(opts.page) : 1;
        const perPage = opts.perPage ? parseInt(opts.perPage) : undefined;
        const totalDocuments = await this.model.countDocuments();
        const totalPages = +Math.ceil(totalDocuments / (perPage || 1));
        if (totalDocuments === 0) {
            return {
                products: [],
                totalPages: 0,
                page: 0
            };
        }
        if (page > totalPages) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_RANGE);
        }
        const query = new opq_builder_1.OPQBuilder()
            .addValidatorForKey("category", (v) => (0, mongoose_1.isValidObjectId)(v))
            .addValidatorForKey("subCategory", (v) => (0, mongoose_1.isValidObjectId)(v))
            .addValidatorForKey("isFeatured", (v) => (v === 'true' || v === 'false'))
            .addToQuery("price", opts.minPrice, (v) => { return { $gte: parseInt(v) }; })
            .addToQuery("price", opts.maxPrice, (v) => { return { $lte: parseInt(v) }; })
            .addToQuery("rating", opts.rating)
            .addToQuery("category", opts.category)
            .addToQuery("subCategory", opts.subCategory)
            .addToQuery("location", opts.location, (v) => { return v === "All" ? "" : v; })
            .addToQuery("isFeatured", opts.isFeatured, (v) => Boolean(v))
            .build();
        console.log("Builded Query: " + JSON.stringify(query, null, 4));
        const docs = await this.model.find(query, null, { skip: (page - 1) * (perPage || 0), limit: perPage })
            .populate('images')
            .populate('category')
            .populate('subCategory').exec();
        return {
            products: docs,
            totalPages: totalPages,
            page: page
        };
    }
    async productsCount() {
        return await this.model.countDocuments();
    }
    async create(newProduct) {
        const categoryEntry = await this.category.getDocumentById(newProduct.category);
        if (!categoryEntry) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE, {
                errorMessage: 'Cannot create product: invalid category submitted',
                userMessage: 'Cannot create product: invalid category submitted'
            });
        }
        try {
            return await this.model.create(newProduct);
        }
        catch (error) {
            if (error instanceof mongoose_1.default.Error.ValidationError) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.VALIDATION_ERROR, {
                    errorMessage: 'Cannot create product: invalid data submitted: ' + error.message,
                    userMessage: 'Cannot create product: invalid data submitted: ' + error.message
                });
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            const existed = await this.model.findById(id);
            if (!existed) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            if (existed.images) {
                await this.imagesService.removeMany(existed.images.map(objId => objId.toString()));
            }
            const deleted = await this.model.findByIdAndDelete(id);
            if (!deleted) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return deleted;
        }
        catch (e) {
            throw e;
        }
    }
    async update(id, newData) {
        const doc = await this.model.findByIdAndUpdate(id, newData, { new: true })
            .populate('images')
            .populate('category')
            .populate('subCategory');
        if (!doc) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return doc;
    }
};
ProductsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('Product')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.Model,
        category_service_1.CategoryService,
        image_upload_service_1.ImageUploadService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map