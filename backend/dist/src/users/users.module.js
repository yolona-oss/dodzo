"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const wishlist_module_1 = require("./../organization/customers/wishlist/wishlist.module");
const cart_module_1 = require("./../organization/customers/cart/cart.module");
const users_service_1 = require("./users.service");
const users_schema_1 = require("./schemes/users.schema");
const users_controller_1 = require("./users.controller");
const orders_module_1 = require("./../organization/customers/orders/orders.module");
const image_upload_module_1 = require("./../common/image-upload/image-upload.module");
let UsersModule = class UsersModule {
    constructor(usersService, configService) {
        this.usersService = usersService;
        this.configService = configService;
    }
    async onApplicationBootstrap() {
        await this.usersService.__createDefaultAdmin({
            name: this.configService.getOrThrow("default_user.name"),
            email: this.configService.getOrThrow("default_user.email"),
            phone: this.configService.getOrThrow("default_user.phone"),
            password: this.configService.getOrThrow("default_user.password"),
        });
    }
};
UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: users_schema_1.UserSchema },
            ]),
            wishlist_module_1.WishlistModule,
            orders_module_1.OrdersModule,
            cart_module_1.CartModule,
            image_upload_module_1.ImageUploadModule
        ],
        exports: [users_service_1.UsersService]
    }),
    tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService])
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map