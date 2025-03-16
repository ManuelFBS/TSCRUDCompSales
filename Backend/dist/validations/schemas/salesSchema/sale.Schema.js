"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSchema = void 0;
const zod_1 = require("zod");
exports.SaleSchema = zod_1.z.object({
    totalAmount: zod_1.z
        .number({
        required_error: 'Total amount is required...',
        invalid_type_error: 'The total amount must be a number...',
    })
        .positive('The total amount must be a positive number...'),
    tax: zod_1.z
        .number({
        required_error: 'Tax is required...',
        invalid_type_error: 'Tax must be a number...',
    })
        .nonnegative('The tax cannot be negative...'),
    saleDate: zod_1.z
        .string({
        required_error: 'Sale date is required...',
        invalid_type_error: 'The sale date must be a string...',
    })
        .date('The sale date must be a valid date in ISO format...'),
    userId: zod_1.z
        .number({
        required_error: 'User ID is required...',
        invalid_type_error: 'The User ID must be a number...',
    })
        .int('The User ID must be INTEGER...')
        .positive('The User ID must be a positive number...'),
    customerId: zod_1.z
        .number({
        required_error: 'Customer ID is required...',
        invalid_type_error: 'The Customer ID must be a number...',
    })
        .int('The Customer ID must be INTEGER...')
        .positive('The Customer ID must be a positive number...'),
});
//# sourceMappingURL=sale.Schema.js.map