import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { AppError, AppErrorTypeEnum } from "./../common/app-error";

import { CreateOrgDto } from "./dto/create-org.dto";
import { OrgDocument } from "./schemes/org.schema";

@Injectable()
export class OrgService {
    constructor(
        @InjectModel('Organization')
        private readonly orgModel: Model<OrgDocument>
    ) {}

    async findAll() {
        const docs = await this.orgModel.find().exec();
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async findById(id: string) {
        const doc = await this.orgModel.findById(id).exec();
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async findByName(name: string) {
        const doc = await this.orgModel.findOne({ name }).exec();
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async create(organization: CreateOrgDto) {
        const doc = await this.orgModel.create(organization)
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async remove(id: string) {
        const doc = await this.orgModel.findByIdAndDelete(id)
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async changeAddress(id: string, address: {
        lat: number,
        lng: number,
        address: string
    }) {
        const doc = await this.orgModel.findByIdAndUpdate(id, address, { new: true })
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }
}
