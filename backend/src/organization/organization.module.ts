import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationEntity } from './schemes/organization.schema';

import OrganizationController from './organization.controller';
import OrganizationService from './organization.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Organization', schema: OrganizationEntity }
        ]),
    ],
    providers: [OrganizationService],
    controllers: [OrganizationController],
    exports: [OrganizationService]
})
export class EmploeersModule { }

