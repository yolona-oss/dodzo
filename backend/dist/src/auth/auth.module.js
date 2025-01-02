"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./../users/users.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./pasport/jwt.strategy");
const constants_1 = require("./../common/constants");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy
        ],
        imports: [
            passport_1.PassportModule.register({
                property: constants_1.REQUSET_USER_KEY,
                defaultStrategy: 'strategy-jwt',
                session: false
            }),
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => {
                    const secret = configService.getOrThrow('jwt.access_token.secret');
                    const expiresIn = configService.getOrThrow('jwt.access_token.sign_options.expires_in');
                    return {
                        secret: secret,
                        signOptions: {
                            expiresIn: expiresIn
                        },
                    };
                },
                inject: [config_1.ConfigService]
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        exports: [auth_service_1.AuthService, passport_1.PassportModule]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map