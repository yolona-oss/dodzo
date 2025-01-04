import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrgSchema } from './schemes/org.schema';

import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { MenuModule } from './menu/menu.module';
import { EmploeersModule } from './emploeers/emploeers.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CustomersModule } from './customers/customers.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Organization', schema: OrgSchema }
        ]),
        MenuModule,
        EmploeersModule,
        DeliveryModule,
        CustomersModule
    ],
    providers: [OrgService],
    controllers: [OrgController],
    exports: [OrgService]
})
export class OrgModule { }
