import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppError, AppErrorTypeEnum } from './../../common/app-error';
import { Model } from 'mongoose';
import { EmploeerEntity } from './schemes/emploeers.schema';
import { CreateEmploeerDto } from './dto/create-emploeer.dto';
import { ISchedule } from './../../common/types/schedule.type';

@Injectable()
export class EmploeersService {
    private populateFields = [ 'organization', 'user' ];

    constructor(
        @InjectModel('Emploeer') private readonly emploeerModel: Model<EmploeerEntity>
    ) {}

    async findAll(): Promise<EmploeerEntity[]> {
        const docs = await this.emploeerModel.find().exec();
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async findById(id: string): Promise<EmploeerEntity> {
        const doc = await this.emploeerModel.findById(id)
            .populate(this.populateFields)
            .exec();
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async findByUser(userId: string) {
        const docs = await this.emploeerModel.find({ user: userId })
            .populate(this.populateFields)
            .exec();
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async findByOrg(orgId: string) {
        const docs = await this.emploeerModel.find({ organization: orgId })
            .populate(this.populateFields)
            .exec();
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return docs
    }

    async create(emploeer: CreateEmploeerDto): Promise<EmploeerEntity> {
        try {
            const doc = await this.emploeerModel.create(emploeer)
            if (!doc) {
                throw new AppError(AppErrorTypeEnum.DB_CANNOT_CREATE)
            }
            return await doc.populate(this.populateFields)
        } catch(error: any) {
            if (error instanceof AppError) {
                throw error
            } else if (error.name === 'ValidationError') {
                throw new AppError(AppErrorTypeEnum.INVALID_DATA, {
                    errorMessage: error.errors
                })
            } else if (error.name === 'CastError') {
                throw new AppError(AppErrorTypeEnum.INVALID_OBJECT_ID, {
                    errorMessage: "Invalid objectId passed: " + error
                })
            } else {
                throw new AppError(AppErrorTypeEnum.DB_CANNOT_CREATE, {
                    errorMessage: error
                })
            }
        }
    }

    async asignScheduleByUser(userId: string, schedule: ISchedule) {
        const doc = await this.emploeerModel.findOneAndUpdate(
            { user: userId },
            { schedule },
            { new: true }
        ).populate(this.populateFields)
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    async asignOrgByUser(userId: string, orgId: string) {
        const doc = await this.emploeerModel.findOneAndUpdate(
            { user: userId },
            { organization: orgId },
            { new: true }
        ).populate(this.populateFields)
        if (!doc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        return doc
    }

    /***
     * Remove document by field user id, not document id
     */
    async remove(userId: string) {
        try {
            const doc = await this.emploeerModel.findOneAndDelete({user: userId})
            if (!doc) {
                throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
            }
            return doc
        } catch (error: any) {
            throw new AppError(AppErrorTypeEnum.DB_CANNOT_DELETE, {
                errorMessage: error
            })
        }
    }
}
