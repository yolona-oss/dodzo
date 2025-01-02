"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformUser = void 0;
function TransformUser(user) {
    return {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        roles: user.roles,
    };
}
exports.TransformUser = TransformUser;
//# sourceMappingURL=auth-response.dto.js.map