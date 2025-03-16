"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSchema = void 0;
const zod_1 = require("zod");
exports.SaleSchema = zod_1.z.object({
    totalAmount: zod_1.z.number(),
    tax: zod_1.z.number(),
    saleDate: zod_1.z.date(),
    userId: zod_1.z.number(),
});
//# sourceMappingURL=sale.Schema.js.map