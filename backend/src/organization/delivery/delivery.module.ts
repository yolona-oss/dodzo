import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Module({
    imports: [],
    providers: [DeliveryService],
    exports: [DeliveryService]
})
export class DeliveryModule { }
