import mongoose, { Model } from 'mongoose';
import { CategoryService } from './../category/category.service';
import { ImageUploadService } from './../../image-upload/image-upload.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDocument } from './schemas/products.schema';
import { ProductEntity } from './schemas/products.schema';
import { FilteringOptions } from './interfaces/filtering-options.interface';
import { FiltredProducts } from './interfaces/filtred-products.interface';
import { DeepPartial } from './../../common/types/deep-partial.type';
export declare class ProductsService {
    private readonly model;
    private readonly category;
    private readonly imagesService;
    constructor(model: Model<ProductDocument>, category: CategoryService, imagesService: ImageUploadService);
    findAll(): Promise<(mongoose.Document<unknown, {}, ProductDocument> & ProductEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
    findById(id: string): Promise<mongoose.Document<unknown, {}, ProductDocument> & ProductEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findOne(query: Partial<Record<keyof ProductDocument, unknown>>): Promise<(mongoose.Document<unknown, {}, ProductDocument> & ProductEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
    findFiltred(opts: FilteringOptions): Promise<FiltredProducts>;
    productsCount(): Promise<number>;
    create(newProduct: CreateProductDto): Promise<mongoose.Document<unknown, {}, ProductDocument> & ProductEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    remove(id: string): Promise<mongoose.Document<unknown, {}, ProductDocument> & ProductEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    update(id: string, newData: DeepPartial<ProductEntity>): Promise<mongoose.Document<unknown, {}, ProductDocument> & ProductEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
