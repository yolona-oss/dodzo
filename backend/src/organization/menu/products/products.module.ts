import { RouterModule } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageUploadModule } from './../../../common/image-upload/image-upload.module';
import { CategoryModule } from './../category/category.module';
import { CategorySchema } from './../category/schemas/category.schema';
import { SubCategorySchema } from './../category/schemas/sub-category.schema';
import { ReviewsModule } from './reviews/reviews.module';
import { ProductsController } from './products.controller';
import { ProductSchema } from './schemes/products.schema';
import { ProductsService } from './products.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Product', schema: ProductSchema },
            { name: 'Category', schema: CategorySchema },
            { name: 'SubCategory', schema: SubCategorySchema },
        ]),
        RouterModule.register([
            {
                path: 'products',
                module: ProductsModule,
            }
        ]),
        ReviewsModule,
        CategoryModule,
        ImageUploadModule,
    ],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [ProductsService]
})
export class ProductsModule {}
