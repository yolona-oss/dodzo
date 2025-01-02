"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cart_module_1 = require("./cart/cart.module");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const category_module_1 = require("./category/category.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
let MarketModule = class MarketModule {
};
MarketModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            cart_module_1.CartModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            category_module_1.CategoryModule,
            wishlist_module_1.WishlistModule,
        ]
    })
], MarketModule);
exports.MarketModule = MarketModule;
//# sourceMappingURL=market.module.js.map