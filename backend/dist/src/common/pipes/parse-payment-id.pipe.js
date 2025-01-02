"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsePaymentIdPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ParsePaymentIdPipe = class ParsePaymentIdPipe {
    transform(value) {
        return String(value);
    }
};
ParsePaymentIdPipe = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ParsePaymentIdPipe);
exports.ParsePaymentIdPipe = ParsePaymentIdPipe;
//# sourceMappingURL=parse-payment-id.pipe.js.map