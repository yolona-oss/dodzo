"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseAddressPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ParseAddressPipe = class ParseAddressPipe {
    transform(value) {
        return String(value);
    }
};
ParseAddressPipe = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ParseAddressPipe);
exports.ParseAddressPipe = ParseAddressPipe;
//# sourceMappingURL=parse-address.pipe.js.map