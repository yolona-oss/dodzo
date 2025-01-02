"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseOrderStatusPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const order_status_enum_1 = require("../enums/order-status.enum");
const app_error_1 = require("./../app-error");
let ParseOrderStatusPipe = class ParseOrderStatusPipe {
    transform(value) {
        if (value === 'pending') {
            return order_status_enum_1.OrderStatus.Pending;
        }
        if (value === 'shipped') {
            return order_status_enum_1.OrderStatus.Shipped;
        }
        if (value === 'canceled') {
            return order_status_enum_1.OrderStatus.Canceled;
        }
        if (value === 'delivered') {
            return order_status_enum_1.OrderStatus.Delivered;
        }
        throw new app_error_1.AppError(app_error_1.AppErrorTypeEnum.INVALID_ORDER_STATUS);
    }
};
ParseOrderStatusPipe = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ParseOrderStatusPipe);
exports.ParseOrderStatusPipe = ParseOrderStatusPipe;
//# sourceMappingURL=parse-order-status.pipe.js.map