"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const zod_1 = require("zod");
// ~ Esquema de validación del cliente...
exports.CustomerSchema = zod_1.z.object({
    dni: zod_1.z.string().min(1, 'DNI is required...'),
    name: zod_1.z.string().min(1, 'Name is required...'),
    lastName: zod_1.z.string().min(1, 'Last name is required...'),
    address: zod_1.z.string().min(1, 'Address is required...'),
});
//# sourceMappingURL=customerSchema.js.map