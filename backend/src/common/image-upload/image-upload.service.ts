import mongoose, { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs'

import { ImagesDocument } from './schemas/image-upload.schema';

import { CRUDService } from './../misc/crud-service';
import { AppError, AppErrorTypeEnum } from './../app-error';
import { extractFileName } from './../misc/utils';
import { DefaultImages, DefaultImagesType } from './../enums/default-images.enum';
import { BlankImagesPath } from './interfaces/blank-images-path.dto';
import { LocalUploadStrategy } from './strategies/local.strategy';
import { ImageUploadStrategy } from 'common/misc/image-upload-strategy';

@Injectable()
export class ImageUploadService extends CRUDService<ImagesDocument> {
    private readonly uploaders: ImageUploadStrategy[] = []
    private currentUploader: string = ""

    constructor(
        @InjectModel('Images')
        private imagesModel: Model<ImagesDocument>,
    ) {
        super(imagesModel)
        const localStrat = new LocalUploadStrategy()
        this.uploaders.push(
            localStrat
        )
        this.currentUploader = localStrat.apiName
    }

    private async uploadFile(file: Express.Multer.File) {
        const selectedUploader = this.uploaders.find(uploader => uploader.apiName === this.currentUploader)
        if (!selectedUploader) {
            throw new AppError(AppErrorTypeEnum.CANNOT_UPLOAD_IMAGE, {
                errorMessage: "Selected uploader not found"
            })
        }
        return await selectedUploader.uploadFile(file)
    }

    private async destroyFile(doc: ImagesDocument) {
        const selectedUploader = this.uploaders.find(uploader => uploader.apiName === doc.uploader)
        if (!selectedUploader) {
            throw new AppError(AppErrorTypeEnum.CANNOT_UPLOAD_IMAGE, {
                errorMessage: "Selected uploader not found"
            })
        }

        return await selectedUploader.destroyFile(doc.uploaderData)
    }

    /***
     * Upload images to cloudinary and save them to db
     */
    async uploadImages(files: Express.Multer.File[]) {
        const imageDocs = new Array<ImagesDocument>;

        for (const file of files) {
            try {
                // upload
                const processed = await this.uploadFile(file)

                if (processed.error) {
                    fs.unlinkSync(file.path)
                    throw new AppError(AppErrorTypeEnum.CANNOT_UPLOAD_IMAGE, {
                        errorMessage: processed.error
                    })
                }

                imageDocs.push(
                    await super.createDocument({
                        url: processed.target,
                        uploader: this.currentUploader,
                        uploaderData: processed.uploaderData
                    })
                )
            } catch(e) {
                fs.unlinkSync(file.path)
                throw e
            } finally {
            } 
        }

        return imageDocs
    }

    async findBlank(type: DefaultImagesType): Promise<ImagesDocument> {
        try {
            const doc = await this.imagesModel.findOne({blankType: DefaultImages[type]})
            if (!doc) {
                throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
            }

            return doc
        } catch (error) {
            // TODO handle error and recreate blank images
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
    }

    override async removeDocumentById(id: string) {
        const imageDoc = await super.getDocumentById(id)

        if (!imageDoc) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }
        await this.destroyFile(imageDoc)

        return await super.removeDocumentById(id)
    }

    async removeMany(ids: string[]) {
        ids.forEach(id => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new AppError(AppErrorTypeEnum.INVALID_OBJECT_ID)
            }
        })

        const images = await this.imagesModel.find({ _id: { $in: ids } }).exec()
        if (!images) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }

        for (let i = 0; i < images.length; ++i) {
            await this.destroyFile(images[i])
            await this.removeDocumentById(ids[i])
        }
    }

    async isImageUploaded(url: string): Promise<ImagesDocument|null> {
        const docs = await super.getAllDocuments()
        if (!docs) {
            throw new AppError(AppErrorTypeEnum.DB_ENTITY_NOT_FOUND)
        }

        for (const doc of docs) {
            if (doc.url == url) {
                return doc
            }
        }
        return null
    }

    /***
     * @deprecated Use ImageUploadService::uploadImages instead
     */
    override async createDocument(data: Omit<ImagesDocument, keyof Document>) {
        throw new Error("Use ImageUploadService::uploadImages instead")
        return super.createDocument(data)
    }

    private async uploadDefaultBlack(file: { path: string, filename: string }, type: DefaultImagesType) {
        const processed = await this.uploadFile(file as Express.Multer.File)
        if (processed.error) {
            throw new AppError(AppErrorTypeEnum.CANNOT_UPLOAD_IMAGE, {
                errorMessage: processed.error
            })
        }

        await this.imagesModel.create({
            url: processed.target,
            uploader: this.currentUploader,
            uploaderData: processed.uploaderData,
            blankType: type
        })
    }

    async __createDefaultBlankImages(localPaths: BlankImagesPath[]): Promise<void> {
        for (const type in DefaultImages) {
            const isBlankExists = await this.imagesModel.find({ blankType: type })
            if (isBlankExists.length > 0) {
                continue
            }

            const fileToUpload = localPaths.filter(path => path.type == type).map(path => {
                return {
                    path: path.path,
                    filename: extractFileName(path.path, false)
                }
            })
            for (let i = 0; i < fileToUpload.length; ++i) {
                await this.uploadDefaultBlack(fileToUpload[i], type as DefaultImagesType)
            }
        }
    }
}
