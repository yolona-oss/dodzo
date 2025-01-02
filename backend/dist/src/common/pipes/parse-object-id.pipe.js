"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseObjectIdPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const app_error_1 = require("./../app-error");
const mongoose_1 = require("mongoose");
let ParseObjectIdPipe = class ParseObjectIdPipe {
    transform(value) {
        const validObjectId = mongoose_1.Types.ObjectId.isValid(value);
        if (!validObjectId) {
            throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_OBJECT_ID);
        }
        return value;
    }
};
ParseObjectIdPipe = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ParseObjectIdPipe);
exports.ParseObjectIdPipe = ParseObjectIdPipe;
//# sourceMappingURL=parse-object-id.pipe.js.map