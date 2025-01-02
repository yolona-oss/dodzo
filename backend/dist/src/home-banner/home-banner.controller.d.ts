import { Response } from 'express';
import { HomeBannerService } from './home-banner.service';
import { CreateHomeBannerDto } from './dto/create-home-banner.dto';
import { UpdateHomeBannerDto } from './dto/update-home-banner.dto';
export declare class HomeBannerController {
    private homeBannerService;
    constructor(homeBannerService: HomeBannerService);
    all(response: Response): Promise<Response<any, Record<string, any>>>;
    create(body: CreateHomeBannerDto, response: Response): Promise<void>;
    get(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, body: UpdateHomeBannerDto, response: Response): Promise<Response<any, Record<string, any>>>;
}
