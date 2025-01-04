"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const constants_1 = require("./../common/constants");
const user_decorator_1 = require("../common/decorators/user.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signin({ email, password }, response) {
        const authResponse = await this.authService.signin(email, password);
        response.cookie(constants_1.REFRESH_TOKEN.cookie.name, authResponse.refresh_token, constants_1.REFRESH_TOKEN.cookie.options);
        response.status(201).json(authResponse);
    }
    async signup(userDto, response) {
        const authResponse = await this.authService.signup(userDto);
        response.cookie(constants_1.REFRESH_TOKEN.cookie.name, authResponse.refresh_token, constants_1.REFRESH_TOKEN.cookie.options);
        response.status(201).json(authResponse);
    }
    async refreshAccessToken(request, response) {
        const authResponse = await this.authService.refreshAccessToken(request.cookies);
        return response
            .status(201)
            .set({ "Cache-Control": "no-store", Pragma: "no-cache" })
            .json(authResponse);
    }
    async logout(user, request, response) {
        await this.authService.logout(user.id, request.cookies);
        const expireCookieOptions = Object.assign({}, constants_1.REFRESH_TOKEN.cookie.options, {
            expires: new Date(1),
        });
        return response
            .cookie(constants_1.REFRESH_TOKEN.cookie.name, "", expireCookieOptions)
            .status(205)
            .json({});
    }
    async logoutAll() {
        throw new common_1.NotImplementedException();
    }
    async forgotPassword() {
        throw new common_1.NotImplementedException();
    }
    async resetPassword() {
        throw new common_1.NotImplementedException();
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('/signin'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
tslib_1.__decorate([
    (0, common_1.Post)('/signup'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
tslib_1.__decorate([
    (0, common_1.Post)('/refresh'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "refreshAccessToken", null);
tslib_1.__decorate([
    (0, common_1.Post)('/logout'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
tslib_1.__decorate([
    (0, common_1.Post)('/master-logout'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
tslib_1.__decorate([
    (0, common_1.Post)('/forgot-password'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    (0, common_1.Post)('/reset-password'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map