"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsePincodePipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ParsePincodePipe = class ParsePincodePipe {
    transform(value) {
        return String(value);
    }
};
ParsePincodePipe = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ParsePincodePipe);
exports.ParsePincodePipe = ParsePincodePipe;
//# sourceMappingURL=parse-pincode.pipe.js.map