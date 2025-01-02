"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const orders_service_1 = require("./orders.service");
const orders_schema_1 = require("./schemas/orders.schema");
const orders_controller_1 = require("./orders.controller");
const user_schema_1 = require("./../../users/schemas/user.schema");
const products_schema_1 = require("./../products/schemas/products.schema");
const cart_module_1 = require("../cart/cart.module");
let OrdersModule = class OrdersModule {
};
OrdersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Orders', schema: orders_schema_1.OrdersSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Product', schema: products_schema_1.ProductSchema },
            ]),
            cart_module_1.CartModule
        ],
        providers: [orders_service_1.OrdersService],
        controllers: [orders_controller_1.OrdersController],
        exports: [orders_service_1.OrdersService]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map