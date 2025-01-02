import { dtoCity } from './dto/cities.dto';
import { ConfigService } from '@nestjs/config';
export declare class CitiesService {
    private configService;
    constructor(configService: ConfigService);
    getAll(): Promise<Array<dtoCity>>;
}
