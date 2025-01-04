import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity, UserDocument } from './schemes/users.schema';
import { DeepPartial } from './../common/types/deep-partial.type';
import { Role } from './../common/enums/role.enum';
import { WishlistService } from '../organization/customers/wishlist/wishlist.service';
import { CartService } from '../organization/customers/cart/cart.service';
import { OrdersService } from '../organization/customers/orders/orders.service';
import { ImageUploadService } from './../common/image-upload/image-upload.service';
import { ImagesEntity } from './../common/image-upload/schemas/image-upload.schema';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly usersModel;
    private readonly wishlistService;
    private readonly cartService;
    private readonly ordersService;
    private readonly imagesService;
    constructor(usersModel: Model<UserDocument>, wishlistService: WishlistService, cartService: CartService, ordersService: OrdersService, imagesService: ImageUploadService);
    findByPhone(phone: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findByEmail(email: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findByAssignedToken(id: string, token: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findById(id: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    findAll(): Promise<(mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
    count(): Promise<number>;
    addToken(userId: string, token: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    removeToken(userId: string, token: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    addResetToken(userId: string, token: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    dropTokens(userId: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    create(userData: CreateUserDto): Promise<mongoose.Document<unknown, {}, mongoose.MergeType<UserDocument, {
        images: ImagesEntity[];
    }>> & Omit<UserDocument, "images"> & {
        images: ImagesEntity[];
    } & Required<{
        _id: unknown;
    }>>;
    remove(id: string): Promise<(mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>) | null>;
    updateSafe(id: string, _newUserInfo: DeepPartial<UpdateUserDto>, currentPassword?: string): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    changePassword(id: string, currentPassword: string, newPassword: string): Promise<UserEntity>;
    addRole(id: string, role: Role): Promise<mongoose.Document<unknown, {}, UserDocument> & UserEntity & mongoose.Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    removeRole(id: string, role: Role): Promise<void>;
    private checkPasswordStrenth;
    private preCreate;
    private preRemove;
    private _createWishlist;
    private _createCart;
    private _removeWishlist;
    private _removeCart;
    private _removeOrders;
    __createDefaultAdmin(user: CreateUserDto): Promise<void>;
}
