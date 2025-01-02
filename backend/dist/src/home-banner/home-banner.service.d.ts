import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { ImageUploadService } from './../image-upload/image-upload.service';
import { HomeBannerDocument } from './schemas/home-banner.schema';
import { CreateHomeBannerDto } from './dto/create-home-banner.dto';
import { UpdateHomeBannerDto } from './dto/update-home-banner.dto';
export declare class HomeBannerService {
    private readonly homeBannerModel;
    private readonly imageUploadService;
    constructor(homeBannerModel: Model<HomeBannerDocument>, imageUploadService: ImageUploadService);
    findAll(): Promise<HomeBannerDocument[]>;
    findById(id: string): Promise<mongoose.Document<unknown, {}, HomeBannerDocument> & import("./schemas/home-banner.schema").HomeBannerEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    createBanner(data: CreateHomeBannerDto): Promise<Omit<mongoose.Document<unknown, {}, HomeBannerDocument> & import("./schemas/home-banner.schema").HomeBannerEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, never>>;
    updateById(id: string, data: UpdateHomeBannerDto): Promise<(mongoose.Document<unknown, {}, HomeBannerDocument> & import("./schemas/home-banner.schema").HomeBannerEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>) | null>;
    removeById(id: string): Promise<(mongoose.Document<unknown, {}, HomeBannerDocument> & import("./schemas/home-banner.schema").HomeBannerEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>) | null>;
}
