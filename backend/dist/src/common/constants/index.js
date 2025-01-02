"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUSET_USER_KEY = exports.RESET_PASSWORD_TOKEN = exports.REFRESH_TOKEN = exports.DEFAULT_REQUEST_PER_PAGE = exports.DEFAULT_REQUEST_PAGE = exports.MIN_USER_PASSWORD_ENTROPY = exports.MIN_USER_PASSWORD_LENGTH = exports.MAX_USER_PASSWORD_LENGTH = exports.DEFAULT_SERVICE_PORT = void 0;
exports.DEFAULT_SERVICE_PORT = 3000;
exports.MAX_USER_PASSWORD_LENGTH = 64;
exports.MIN_USER_PASSWORD_LENGTH = 8;
exports.MIN_USER_PASSWORD_ENTROPY = 73;
var request_query_constants_1 = require("./request-query.constants");
Object.defineProperty(exports, "DEFAULT_REQUEST_PAGE", { enumerable: true, get: function () { return request_query_constants_1.DEFAULT_REQUEST_PAGE; } });
Object.defineProperty(exports, "DEFAULT_REQUEST_PER_PAGE", { enumerable: true, get: function () { return request_query_constants_1.DEFAULT_REQUEST_PER_PAGE; } });
var jwt_constants_1 = require("./jwt.constants");
Object.defineProperty(exports, "REFRESH_TOKEN", { enumerable: true, get: function () { return jwt_constants_1.REFRESH_TOKEN; } });
Object.defineProperty(exports, "RESET_PASSWORD_TOKEN", { enumerable: true, get: function () { return jwt_constants_1.RESET_PASSWORD_TOKEN; } });
Object.defineProperty(exports, "REQUSET_USER_KEY", { enumerable: true, get: function () { return jwt_constants_1.REQUSET_USER_KEY; } });
//# sourceMappingURL=index.js.map