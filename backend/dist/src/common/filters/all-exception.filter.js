"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExeptionFilter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const app_error_1 = require("./../app-error");
let AllExeptionFilter = class AllExeptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof app_error_1.AppError) {
            return response.status(exception.httpStatus).json({
                errorCode: exception.errorCode,
                errorMsg: exception.errorMessage,
                usrMsg: exception.userMessage,
                httpCode: exception.httpStatus,
            });
        }
        else if (exception instanceof common_1.UnauthorizedException) {
            return response.status(common_1.HttpStatus.UNAUTHORIZED).json(exception.message);
        }
        else if (exception.status === 403) {
            return response.status(common_1.HttpStatus.FORBIDDEN).json(exception.message);
        }
        else {
            console.error(exception.message);
            console.error(exception.stack);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
};
AllExeptionFilter = tslib_1.__decorate([
    (0, common_1.Catch)()
], AllExeptionFilter);
exports.AllExeptionFilter = AllExeptionFilter;
//# sourceMappingURL=all-exception.filter.js.map