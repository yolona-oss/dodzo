/// <reference types="multer" />
import { Response } from 'express';
import { ImageUploadService } from './image-upload.service';
export declare class ImageUploadController {
    private readonly imageUploadService;
    constructor(imageUploadService: ImageUploadService);
    upload(files: Array<Express.Multer.File>, res: Response): Promise<void>;
    all(response: Response): Promise<void>;
    get(id: string, response: Response): Promise<void>;
    remove(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
}
