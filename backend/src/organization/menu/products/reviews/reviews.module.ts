import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReviewsService } from './reviews.service';

import { ReviewsSchema } from './schemes/reviews.schema';
import { ProductSchema } from './../schemes/products.schema';
import { CustomerSchema } from 'organization/customers/schemes/customers.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Reviews',  schema: ReviewsSchema },
            { name: 'Customers',  schema: CustomerSchema },
            { name: 'Products',  schema: ProductSchema },
        ])
    ],
    providers: [ReviewsService],
    exports: [ReviewsService],
})
export class ProductReviewsModule {}
