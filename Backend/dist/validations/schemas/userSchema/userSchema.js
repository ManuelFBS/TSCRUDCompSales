"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
// ~ Esquema de validación del usuario...
exports.UserSchema = zod_1.z.object({
    dni: zod_1.z.string().min(1, 'DNI is required...'),
    user: zod_1.z.string().min(5, 'User is required...'),
    password: zod_1.z.string().min(6, 'Password is required...'),
    role: zod_1.z.enum(['Owner', 'Admin', 'Employee']),
});
//# sourceMappingURL=userSchema.js.map