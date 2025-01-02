"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const configuration_1 = tslib_1.__importDefault(require("./common/config/configuration"));
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const market_module_1 = require("./market/market.module");
const common_module_1 = require("./common/common.module");
const config_1 = require("@nestjs/config");
const image_upload_module_1 = require("./image-upload/image-upload.module");
const home_banner_module_1 = require("./home-banner/home-banner.module");
const jwt_guard_1 = require("./auth/guards/jwt.guard");
const throttler_1 = require("@nestjs/throttler");
const jwt_1 = require("@nestjs/jwt");
const orders_module_1 = require("./market/orders/orders.module");
const wishlist_module_1 = require("./market/wishlist/wishlist.module");
const cart_module_1 = require("./market/cart/cart.module");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            users_module_1.UsersModule,
            market_module_1.MarketModule,
            image_upload_module_1.ImageUploadModule,
            home_banner_module_1.HomeBannerModule,
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
                cache: true
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'uploads'),
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 15 * 60 * 1000,
                    limit: 100
                }]),
            core_1.RouterModule.register([
                {
                    path: 'users',
                    module: users_module_1.UsersModule,
                    children: [
                        {
                            path: 'orders',
                            module: orders_module_1.OrdersModule
                        },
                        {
                            path: 'wishlist',
                            module: wishlist_module_1.WishlistModule
                        },
                        {
                            path: 'cart',
                            module: cart_module_1.CartModule
                        },
                        {
                            path: 'auth',
                            module: auth_module_1.AuthModule
                        }
                    ]
                }
            ]),
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map