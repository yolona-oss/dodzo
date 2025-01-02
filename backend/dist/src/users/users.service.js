"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const app_error_1 = require("./../common/app-error");
const crypto_service_1 = tslib_1.__importDefault(require("./../auth/crypto-service"));
const constants_1 = require("./../common/constants");
const role_enum_1 = require("./../common/enums/role.enum");
const wishlist_service_1 = require("../market/wishlist/wishlist.service");
const cart_service_1 = require("../market/cart/cart.service");
const orders_service_1 = require("../market/orders/orders.service");
const image_upload_service_1 = require("./../image-upload/image-upload.service");
let UsersService = class UsersService {
    constructor(usersModel, wishlistService, cartService, ordersService, imagesService) {
        this.usersModel = usersModel;
        this.wishlistService = wishlistService;
        this.cartService = cartService;
        this.ordersService = ordersService;
        this.imagesService = imagesService;
    }
    async findByPhone(phone) {
        const userDoc = await this.usersModel.findOne({ phone: phone });
        if (!userDoc) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return userDoc;
    }
    async findByEmail(email) {
        const userDoc = await this.usersModel.findOne({ email: email });
        if (!userDoc) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return userDoc;
    }
    async findByAssignedToken(id, token) {
        try {
            const doc = await this.usersModel.findOne({
                _id: id,
                'tokens.token': token
            });
            if (!doc) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return doc;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.VALIDATION_ERROR, {
                errorMessage: error.message,
                userMessage: 'Invalid token'
            });
        }
    }
    async findById(id) {
        const userDoc = await this.usersModel.findById(id);
        if (!userDoc) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
        }
        return userDoc;
    }
    async findAll() {
        return await this.usersModel.find();
    }
    async count() {
        const count = await this.usersModel.countDocuments();
        return count;
    }
    async addToken(userId, token) {
        try {
            const user = await this.usersModel.findByIdAndUpdate(userId, {
                $addToSet: {
                    tokens: {
                        token
                    }
                }
            });
            if (!user) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE, {
                errorMessage: error.message,
                userMessage: 'Cannot add token'
            });
        }
    }
    async removeToken(userId, token) {
        try {
            const user = await this.usersModel.findByIdAndUpdate(userId, {
                $pull: {
                    tokens: {
                        token
                    }
                }
            });
            if (!user) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE, {
                errorMessage: error.message,
                userMessage: 'Cannot remove token'
            });
        }
    }
    async addResetToken(userId, token) {
        try {
            const user = await this.usersModel.findByIdAndUpdate(userId, {
                resetPasswordToken: token,
                resetPasswordTokenExpiry: 5 * 60 * 1000
            });
            if (!user) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE, {
                errorMessage: error.message,
                userMessage: 'Cannot add reset token'
            });
        }
    }
    async dropTokens(userId) {
        try {
            const user = await this.usersModel.findByIdAndUpdate(userId, {
                tokens: []
            });
            if (!user) {
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE, {
                errorMessage: error.message,
                userMessage: 'Cannot drop tokens'
            });
        }
    }
    async create(userData) {
        const isDuplicate = await this.findByEmail(userData.email);
        const isPhoneDuplicate = await this.findByPhone(userData.phone);
        if (isDuplicate || isPhoneDuplicate) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_ENTITY_EXISTS, { errorMessage: "User exists", userMessage: "User exists" });
        }
        this.checkPasswordStrenth(userData.password);
        const passwordHash = crypto_service_1.default.createPasswordHash(userData.password);
        const initUser = await this.usersModel.create({
            ...userData,
            password: passwordHash,
            roles: ([role_enum_1.Role.User]),
            images: userData.images || [(await this.imagesService.findBlank("User")).id],
            orders: []
        });
        const pre = await this.preCreate(initUser.id);
        const res = await this.usersModel.findByIdAndUpdate(initUser.id, {
            $set: {
                wishlist: pre.wishlist,
                cart: pre.cart
            }
        }, { new: true }).populate('images');
        if (!res) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE);
        }
        return res;
    }
    async remove(id) {
        await this.preRemove(id);
        return await this.usersModel.findByIdAndDelete(id);
    }
    async updateSafe(id, _newUserInfo, currentPassword) {
        let newUserInfo = _newUserInfo;
        if (Object.keys(newUserInfo).length == 0) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_NOTHING_TO_UPDATE);
        }
        if (newUserInfo.roles?.includes(role_enum_1.Role.Admin)) {
            throw new common_1.UnauthorizedException("Cannot update admin status.");
        }
        const existsUser = await this.findById(id);
        if (currentPassword) {
            if (!crypto_service_1.default.comparePasswords(currentPassword, existsUser.password)) {
                throw new common_1.UnauthorizedException("Cannot update without passing user password");
            }
        }
        if (newUserInfo.password) {
            if (currentPassword && (currentPassword !== newUserInfo.password)) {
                newUserInfo.password = crypto_service_1.default.createPasswordHash(newUserInfo.password);
            }
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE, {
                errorMessage: 'Cannot update user password without passing an exiting or current and passed passwords not match',
                userMessage: 'Cannot update user password without passing an exiting or current and passed passwords not match'
            });
        }
        const updated = await this.usersModel.findByIdAndUpdate(id, newUserInfo, { new: true });
        if (!updated) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_UPDATE);
        }
        return updated;
    }
    async changePassword(id, currentPassword, newPassword) {
        return await this.updateSafe(id, { password: newPassword }, currentPassword);
    }
    async addRole(id, role) {
        const currentRoles = (await this.findById(id)).roles;
        if (currentRoles.includes(role)) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.ROLE_ALREADY_PROVIDED);
        }
        return await this.updateSafe(id, { roles: [...currentRoles, role] });
    }
    async removeRole(id, role) {
        const currentRoles = (await this.findById(id)).roles;
        if (!currentRoles.includes(role)) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.ROLE_NOT_PROVIDED);
        }
    }
    async __createDefaultAdmin(user) {
        const defaultUser = await this.findByEmail(user.email);
        if (!defaultUser) {
            try {
                const initUser = await this.usersModel.create({
                    ...user,
                    password: crypto_service_1.default.createPasswordHash(user.password),
                    roles: [role_enum_1.Role.Admin]
                });
                const pre = await this.preCreate(initUser.id);
                await this.usersModel.findByIdAndUpdate(initUser.id, {
                    $set: {
                        wishlist: pre.wishlist,
                        cart: pre.cart
                    }
                }, { new: true });
            }
            catch (e) {
                console.error(e);
                throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.DB_CANNOT_CREATE, {
                    errorMessage: "Cannot create default admin",
                    userMessage: "Cannot create default admin"
                });
            }
        }
    }
    checkPasswordStrenth(password) {
        if (password.length < constants_1.MIN_USER_PASSWORD_LENGTH) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INSUFFICIENT_USER_PASSWORD_LENGTH, {
                errorMessage: "Insufficient user password length. Must be at least " + constants_1.MIN_USER_PASSWORD_LENGTH + " characters.",
                userMessage: "Insufficient user password length. Must be at least " + constants_1.MIN_USER_PASSWORD_LENGTH + " characters.",
            });
        }
        else if (password.length >= constants_1.MAX_USER_PASSWORD_LENGTH) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INSUFFICIENT_USER_PASSWORD_LENGTH, {
                errorMessage: "Insufficient user password length. Must be less than " + constants_1.MAX_USER_PASSWORD_LENGTH + " characters.",
                userMessage: "Insufficient user password length. Must be less than " + constants_1.MAX_USER_PASSWORD_LENGTH + " characters.",
            });
        }
        else if (crypto_service_1.default.calculateEntropy(password).entropy < constants_1.MIN_USER_PASSWORD_ENTROPY) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INSUFFICIENT_USER_PASSWORD_ENTROPY, {
                errorMessage: "Insufficient user password entropy. Must be at least " + constants_1.MIN_USER_PASSWORD_ENTROPY + " bits.",
                userMessage: "Insufficient user password entropy. Must be at least " + constants_1.MIN_USER_PASSWORD_ENTROPY + " bits.",
            });
        }
    }
    async preCreate(id) {
        const cartId = String((await this._createCart(id)).id);
        const wishlistId = String((await this._createWishlist(id)).id);
        return {
            cart: new mongoose_1.default.Types.ObjectId(cartId),
            wishlist: new mongoose_1.default.Types.ObjectId(wishlistId),
        };
    }
    async preRemove(id) {
        await this._removeCart(id);
        await this._removeWishlist(id);
        await this._removeOrders(id);
    }
    async _createWishlist(id) {
        return await this.wishlistService.create(id, []);
    }
    async _createCart(id) {
        return await this.cartService.create(id, []);
    }
    async _removeWishlist(id) {
        return await this.wishlistService.removeUserWishlist(id);
    }
    async _removeCart(id) {
        return await this.cartService.removeUserCart(id);
    }
    async _removeOrders(id) {
        return await this.ordersService.removeUserOrders(id);
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)('User')),
    tslib_1.__metadata("design:paramtypes", [mongoose_1.Model,
        wishlist_service_1.WishlistService,
        cart_service_1.CartService,
        orders_service_1.OrdersService,
        image_upload_service_1.ImageUploadService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map