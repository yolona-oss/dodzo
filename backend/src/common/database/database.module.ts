import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow<string>("database.connection_string"),
                dbName: configService.getOrThrow<string>("database.name"),
            }),
            inject: [ConfigService],
        })
    ]
})
export class DatabaseModule {}
