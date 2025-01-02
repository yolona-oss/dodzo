import { ConfigService } from '@nestjs/config';
export declare const cloudinaryProvider: {
    provide: string;
    useFactory: (config: ConfigService) => import("cloudinary").ConfigOptions;
    inject: (typeof ConfigService)[];
}[];
