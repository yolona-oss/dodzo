import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartSchema } from './schemes/cart.schema';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

import { ProductSchema } from '../../menu/products/schemes/products.schema';
import { UserSchema } from '../../../users/schemes/users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Cart', schema: CartSchema },
            { name: 'User', schema: UserSchema },
            { name: 'Product', schema: ProductSchema },
        ])
    ],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService]
})
export class CartModule {}
