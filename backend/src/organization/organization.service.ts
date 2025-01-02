import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";

import { AppError, AppErrorTypeEnum } from "./../common/app-error";

import { CreateOrgDto } from "./dto/create-org.dto";
import { OrganizationEntity } from "./schemes/organization.schema";

@Injectable()
export class OrganizationService {
    constructor(
        @Inject() private readonly organizationModel: Model<OrganizationEntity>
    ) {}

    async findAll() {
        const docs = await this.organizationModel.find().exec();
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async findById(id: string) {
        const doc = await this.organizationModel.findById(id).exec();
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async findByName(name: string) {
        const doc = await this.organizationModel.findOne({ name }).exec();
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async create(organization: CreateOrgDto) {
        const doc = await this.organizationModel.create(organization)
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async remove(id: string) {
        const doc = await this.organizationModel.findByIdAndDelete(id)
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
        const doc = await this.organizationModel.findByIdAndUpdate(id, address, { new: true })
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }
}
