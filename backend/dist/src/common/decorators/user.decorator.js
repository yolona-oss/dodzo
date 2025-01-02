"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./../constants");
exports.AuthUser = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request[constants_1.REQUSET_USER_KEY];
});
//# sourceMappingURL=user.decorator.js.map