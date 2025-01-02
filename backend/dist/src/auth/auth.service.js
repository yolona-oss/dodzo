"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const crypto_service_1 = tslib_1.__importDefault(require("./crypto-service"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const app_error_1 = require("./../common/app-error");
const auth_response_dto_1 = require("./dto/auth-response.dto");
const role_enum_1 = require("./../common/enums/role.enum");
const constants_1 = require("../common/constants");
let AuthService = class AuthService {
    constructor(jwtService, usersService, configService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.configService = configService;
    }
    async signin(email, password) {
        const user = await this.validateUser(email, password);
        const { access_token, refresh_token } = await this.generateTokens(user.id, user.email, user.roles);
        return {
            access_token,
            refresh_token,
            user: (0, auth_response_dto_1.TransformUser)(user)
        };
    }
    async signup(userInfo) {
        const newUser = await this.usersService.create(userInfo);
        const { access_token, refresh_token } = await this.generateTokens(newUser.id, newUser.email, [role_enum_1.DEFAULT_USER_ROLE]);
        return {
            access_token,
            refresh_token,
            user: (0, auth_response_dto_1.TransformUser)(newUser)
        };
    }
    async logout(userId, cookies) {
        const refresToken = cookies[constants_1.REFRESH_TOKEN.cookie.name];
        const rTknHash = crypto_1.default
            .createHmac("sha256", this.configService.getOrThrow('jwt.refresh_token.secret'))
            .update(refresToken)
            .digest("hex");
        await this.usersService.removeToken(userId, rTknHash);
        return;
    }
    generateAcessToken(userId, email, roles) {
        const access_token_payload = {
            email: email,
            id: userId,
            roles: roles
        };
        const access_token = this.jwtService.sign(access_token_payload);
        return {
            access_token
        };
    }
    async generateRefreshToken(userId) {
        const refresh_token = this.jwtService.sign({ id: userId.toString(), _id: userId.toString() }, {
            expiresIn: '7d',
            secret: this.configService.getOrThrow('jwt.refresh_token.secret')
        });
        const rTknHash = crypto_1.default
            .createHmac("sha256", this.configService.getOrThrow('jwt.refresh_token.secret'))
            .update(refresh_token)
            .digest("hex");
        await this.usersService.addToken(userId, rTknHash);
        return {
            refresh_token
        };
    }
    async generateTokens(userId, email, roles) {
        const { access_token } = this.generateAcessToken(userId, email, roles);
        const { refresh_token } = await this.generateRefreshToken(userId);
        return {
            access_token,
            refresh_token
        };
    }
    async generageResetToken(userId) {
        const resetTokenValue = crypto_1.default.randomBytes(20).toString("base64url");
        const resetTokenSecret = crypto_1.default.randomBytes(10).toString("hex");
        const resetToken = `${resetTokenValue}+${resetTokenSecret}`;
        const resetTokenHash = crypto_1.default
            .createHmac("sha256", resetTokenSecret)
            .update(resetTokenValue)
            .digest("hex");
        try {
            await this.usersService.addResetToken(userId, resetTokenHash);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('You are unauthenticated!');
        }
        return resetToken;
    }
    async refreshAccessToken(cookies) {
        try {
            const refreshToken = cookies[constants_1.REFRESH_TOKEN.cookie.name];
            if (!refreshToken) {
                throw new common_1.UnauthorizedException('Refresh token not found');
            }
            const decodedRefreshTkn = this.jwtService.verify(refreshToken, { secret: this.configService.getOrThrow('jwt.refresh_token.secret') });
            const rTknHash = crypto_1.default
                .createHmac("sha256", this.configService.getOrThrow('jwt.refresh_token.secret'))
                .update(refreshToken)
                .digest("hex");
            try {
                await this.usersService.findByAssignedToken(decodedRefreshTkn.id, rTknHash);
            }
            catch (error) {
                if (error instanceof app_error_1.AppError) {
                    throw error;
                }
                throw new common_1.UnauthorizedException('You are unauthenticated!');
            }
            const newAtkn = this.generateAcessToken(decodedRefreshTkn.id, decodedRefreshTkn.email, decodedRefreshTkn.roles);
            return newAtkn;
        }
        catch (error) {
            if (error instanceof app_error_1.AppError) {
                throw error;
            }
            throw new app_error_1.AppError();
        }
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !crypto_service_1.default.comparePasswords(pass, user.password)) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_CREDENTIALS_EXCEPTION);
        }
        return user;
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map