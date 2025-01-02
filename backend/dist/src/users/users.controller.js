"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const parse_object_id_pipe_1 = require("./../common/pipes/parse-object-id.pipe");
const users_service_1 = require("./users.service");
const role_decorator_1 = require("./../common/decorators/role.decorator");
const role_enum_1 = require("./../common/enums/role.enum");
const user_decorator_1 = require("./../common/decorators/user.decorator");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getAllUsers(response) {
        const docs = await this.usersService.findAll();
        response.json(docs);
    }
    async getUsersCount(response) {
        const count = await this.usersService.count();
        response.status(200).json(count);
    }
    async deleteUserById(id, response) {
        const doc = await this.usersService.remove(id);
        response.status(200).json(doc);
    }
    async updateUserById(user, data, response) {
        const doc = await this.usersService.updateSafe(user.id, data, data.password);
        response.status(200).json(doc);
    }
    async changePassword(user, data, response) {
        const { newPassword, oldPassword } = data;
        const updatedUser = await this.usersService.changePassword(user.id, oldPassword, newPassword);
        response.status(200).json(updatedUser);
    }
    async getUserById(user, response) {
        const doc = await this.usersService.findById(user.id);
        response.status(200).json(doc);
    }
};
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)('/'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)('/count'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersCount", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Delete)('/delete'),
    tslib_1.__param(0, (0, common_1.Query)('userId', parse_object_id_pipe_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Put)('/update'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Put)('/update/password'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
tslib_1.__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Get)('/me'),
    tslib_1.__param(0, (0, user_decorator_1.AuthUser)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
UsersController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map