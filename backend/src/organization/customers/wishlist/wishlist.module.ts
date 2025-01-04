import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { WishlistSchema } from './schemes/wishlist.schema';
import { ProductSchema } from '../../menu/products/schemes/products.schema';
import { UserSchema } from '../../../users/schemes/users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Wishlist', schema: WishlistSchema },
            { name: 'User', schema: UserSchema },
            { name: 'Product', schema: ProductSchema }
        ])
    ],
    controllers: [WishlistController],
    providers: [WishlistService],
    exports: [WishlistService]
})
export class WishlistModule {}
