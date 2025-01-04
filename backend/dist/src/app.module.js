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
const common_module_1 = require("./common/common.module");
const config_1 = require("@nestjs/config");
const org_module_1 = require("./organization/org.module");
const jwt_guard_1 = require("./auth/guards/jwt.guard");
const throttler_1 = require("@nestjs/throttler");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            org_module_1.OrgModule,
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
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map