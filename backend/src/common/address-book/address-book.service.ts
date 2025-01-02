import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAddressDto } from './dto/create-address.dto';

import { AppError, AppErrorTypeEnum } from './../app-error';

import { AddressBookEntity } from './schemes/address-book.schema';

@Injectable()
export class AddressBookService {
    constructor(
        @InjectModel('AddressBook')
        private addressBookModel: Model<AddressBookEntity>
    ) {}

    async findAll() {
        const docs = await this.addressBookModel.find().exec();
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async findById(id: string) {
        const doc = await this.addressBookModel.findById(id).exec();
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async updateLabel(id: string, label: string) {
        const doc = await this.addressBookModel.findByIdAndUpdate(id, {label}, { new: true })
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async updateAddress(id: string, address: Pick<CreateAddressDto, 'coordinates' | 'address'>) {
        const doc = await this.addressBookModel.findByIdAndUpdate(
            id,
            {
                coordinates: address.coordinates,
                address: address.address
            },
            { new: true })
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async remove(id: string) {
        const doc = await this.addressBookModel.findByIdAndDelete(id)
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_DELETE)
        }
        return doc
    }

    async create(address: CreateAddressDto) {
        const doc = await this.addressBookModel.create(address)
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_CREATE)
        }
        return doc
    }
}
