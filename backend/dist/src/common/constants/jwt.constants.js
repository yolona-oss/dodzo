"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUSET_USER_KEY = exports.RESET_PASSWORD_TOKEN = exports.REFRESH_TOKEN = void 0;
exports.REFRESH_TOKEN = {
    cookie: {
        name: "refreshTkn",
        options: {
            sameSite: false,
            secure: true,
            httpOnly: false,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    },
};
exports.RESET_PASSWORD_TOKEN = {
    expiry: process.env.JWT_REFRESH_TOKEN_OPTION_EXPIRES_IN,
};
exports.REQUSET_USER_KEY = 'user';
//# sourceMappingURL=jwt.constants.js.map