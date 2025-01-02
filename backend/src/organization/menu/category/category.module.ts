import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageUploadModule } from './../../image-upload/image-upload.module';
import { CategoryController } from './category.controller';
import { CategorySchema } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategorySchema } from './schemas/sub-category.schema';
import { SubCategoryService } from './sub-category.service';

@Module({
    imports: [
        ImageUploadModule,
        MongooseModule.forFeature([
            { name: 'Category', schema: CategorySchema },
            { name: 'SubCategory', schema: SubCategorySchema },
        ]),
    ],
    providers: [SubCategoryService, CategoryService],
    exports: [SubCategoryService, CategoryService],
    controllers: [CategoryController, SubCategoryController]
})
export class CategoryModule {}
