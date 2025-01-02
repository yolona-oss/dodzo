import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerEntity } from './schemes/customers.schema';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Customer', schema: CustomerEntity }
        ]),
        CartModule,
        WishlistModule,
        OrdersModule
    ],
    providers: [CustomersService],
    controllers: [CustomersController],
    exports: [CustomersService]
})
export class CustomersModule {}
