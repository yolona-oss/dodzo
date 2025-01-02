import { OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImageUploadService } from './image-upload.service';
export declare class ImageUploadModule implements OnApplicationBootstrap {
    private imagesService;
    private configService;
    constructor(imagesService: ImageUploadService, configService: ConfigService);
    onApplicationBootstrap(): Promise<void>;
}
