import { OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
export declare class UsersModule implements OnApplicationBootstrap {
    private usersService;
    private configService;
    constructor(usersService: UsersService, configService: ConfigService);
    onApplicationBootstrap(): Promise<void>;
}
