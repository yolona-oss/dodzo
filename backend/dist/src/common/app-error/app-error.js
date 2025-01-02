"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const app_error_type_enum_1 = require("./enums/app-error-type.enum");
const app_error_defs_1 = require("./app-error-defs");
class AppError extends Error {
    constructor(errorCode = app_error_type_enum_1.AppErrorTypeEnum.BAD_REQUEST, options) {
        super();
        const error = app_error_defs_1.ErrorsDefenition[errorCode];
        if (options) {
            Object.keys(options).forEach(key => error[key] = options[key]);
        }
        if (!error)
            throw new Error('Unable to find message code error.');
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.httpStatus = error.httpStatus;
        this.errorCode = errorCode;
        this.errorMessage = error.errorMessage;
        this.userMessage = error.userMessage;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=app-error.js.map