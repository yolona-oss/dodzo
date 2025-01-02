import { UploadApiOptions } from 'cloudinary';
import { CloudinaryResponse } from './types/cloudinary-response.type';
export declare class CloudinaryService {
    uploadFile(file_path: string, options: UploadApiOptions): Promise<CloudinaryResponse | any>;
    destroyFile(public_id: string): Promise<unknown>;
}
