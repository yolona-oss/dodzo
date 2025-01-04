import { Module } from '@nestjs/common';

import { APP_GUARD, RouterModule } from '@nestjs/core';

import AppConfig from './common/config/configuration'
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { OrgModule } from './organization/org.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        CommonModule,
        AuthModule,
        UsersModule,
        OrgModule,
        JwtModule,

        ConfigModule.forRoot({
            load: [AppConfig],
            isGlobal: true,
            cache: true
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'uploads'),
        }),
        ThrottlerModule.forRoot([{
            ttl: 15 * 60 * 1000,
            limit: 100
        }]),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
})
export class AppModule { }
