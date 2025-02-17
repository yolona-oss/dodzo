import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersSchema } from './schemes/orders.schema'
import { OrdersController } from './orders.controller';

import { UserSchema } from './../../../users/schemes/users.schema';
import { ProductSchema } from './../../menu/products/schemes/products.schema';

import { CartModule } from '../cart/cart.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Orders', schema: OrdersSchema },
            { name: 'User', schema: UserSchema },
            { name: 'Product', schema: ProductSchema },
        ]),
        CartModule
    ],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [OrdersService]
})
export class OrdersModule {}
