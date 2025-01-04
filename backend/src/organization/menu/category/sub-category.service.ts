import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SubCategoryDocument } from './schemas/sub-category.schema';

import { CRUDService } from './../../../common/misc/crud-service';
import { OPQBuilder } from './../../../common/misc/opq-builder';
import { AppError, AppErrorTypeEnum } from './../../../common/app-error';

import { FilteringSubCategoryOptions } from './interfaces/filtring-sub-category-options.interface';
import { CategoryDocument } from './schemas/category.schema';

import { LimitedOutput } from '../../../common/interfaces/limited-output.interface';

@Injectable()
export class SubCategoryService extends CRUDService<SubCategoryDocument> {
    constructor(
        @InjectModel('SubCategory')
        readonly subCategoryModel: Model<SubCategoryDocument>,
        @InjectModel('Category')
        private readonly categoryModel: Model<CategoryDocument>,
    ) {
        super(subCategoryModel)
    }

    async findFiltredWrapper(opts: FilteringSubCategoryOptions): Promise<LimitedOutput<SubCategoryDocument>> {
        const page: number = opts.page ? parseInt(opts.page) : 1
        const perPage = opts.perPage ? parseInt(opts.perPage) : undefined

        const totalDocuments = await this.subCategoryModel.countDocuments()
        const totalPages = +Math.ceil(totalDocuments / (perPage || 1))

        if (totalDocuments === 0) {
            return {
                data: [],
                offset: 0,
                limit: 0
            }
        }

        if (page > totalPages) {
            throw new AppError(AppErrorTypeEnum.INVALID_RANGE)
        }

        const query = new OPQBuilder()
            .build()

        const docs = await this.subCategoryModel.find(query, null,
                                                      { skip: (page - 1) * (perPage || 0), limit: perPage }
                                                     ).populate({
                                                         path: 'category',
                                                         model: this.categoryModel,
                                                         populate: {
                                                             path: 'images'
                                                         }
                                                     }).exec()

        if (!docs) {
            new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }

        return {
            data: docs,
            limit: totalPages,
            offset: page
        }
    }

    override async getAllDocuments() {
        return await this.subCategoryModel.find().populate("category").exec()
    }
}
