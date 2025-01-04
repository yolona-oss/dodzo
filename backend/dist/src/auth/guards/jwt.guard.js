"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("./../../common/constants");
const public_decorotor_1 = require("./../../common/decorators/public.decorotor");
const role_decorator_1 = require("./../../common/decorators/role.decorator");
let JwtGuard = class JwtGuard extends (0, passport_1.AuthGuard)('strategy-jwt') {
    constructor(reflector, jwtService, configService) {
        super();
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorotor_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException("Authentication token not found.");
        }
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.getOrThrow("jwt.access_token.secret"),
            });
            request[constants_1.REQUSET_USER_KEY] = payload;
            return requiredRoles.some((role) => payload.roles.includes(role));
        }
        catch {
            throw new common_1.UnauthorizedException("Invalid authentication token.");
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
JwtGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        config_1.ConfigService])
], JwtGuard);
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=jwt.guard.js.map