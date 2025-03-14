"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierSchema = void 0;
const zod_1 = require("zod");
// ~ Esquema de validación del proveedor...
exports.SupplierSchema = zod_1.z.object({
    rif: zod_1.z.string().min(5, 'Rif is required'),
    companyName: zod_1.z
        .string()
        .min(5, 'Company Name is required...'),
    address: zod_1.z.string().min(5, 'Address is reqired...'),
    code: zod_1.z.string().min(3, 'Code Supplier is required...'),
    country: zod_1.z.string().min(3, 'Country is required...'),
});
//# sourceMappingURL=supplier.Schema.js.map