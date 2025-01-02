import { Document, Model } from 'mongoose';
import { CloudinaryService } from './../common/cloudinary/cloudinary.service';
import { ImagesDocument } from './schemas/image-upload.schema';
import { CRUDService } from './../common/misc/crud-service';
import { DefaultImagesType } from './../common/enums/default-images.enum';
import { BlankImagesPath } from './interfaces/blank-images-path.dto';
export declare class ImageUploadService extends CRUDService<ImagesDocument> {
    private imagesModel;
    private readonly cloudinaryService;
    constructor(imagesModel: Model<ImagesDocument>, cloudinaryService: CloudinaryService);
    uploadImages(files: {
        path: string;
        filename: string;
    }[], blankType?: DefaultImagesType): Promise<ImagesDocument[]>;
    findBlank(type: DefaultImagesType): Promise<ImagesDocument>;
    removeDocumentById(id: string): Promise<any>;
    removeMany(ids: string[]): Promise<void>;
    isImageUploaded(url: string): Promise<ImagesDocument | null>;
    createDocument(data: Omit<ImagesDocument, keyof Document>): Promise<ImagesDocument>;
    __createDefaultBlankImages(localPaths: BlankImagesPath[]): Promise<void>;
}
