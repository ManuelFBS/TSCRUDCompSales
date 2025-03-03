"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSchema = void 0;
const zod_1 = require("zod");
// ~ Esquema de validación del empleado...
exports.EmployeeSchema = zod_1.z.object({
    dni: zod_1.z.string().min(1, 'DNI is required...'),
    name: zod_1.z.string().min(1, 'Name is required...'),
    lastName: zod_1.z.string().min(1, 'Last name is required...'),
    email: zod_1.z.string().email('Invalid email address...'),
    phone: zod_1.z.string().min(1, 'Phone is required...'),
    country: zod_1.z.string().min(1, 'DNI is required...'),
    // statusWork: z.enum([
    //     'Activo',
    //     'Vacaciones',
    //     'Permiso Laboral',
    //     'Reposo Médico',
    //     'Suspendido',
    //     'Desincorporado',
    // ]),
    // department: z.string().min(1, 'Department is required'),
    // position: z.string().min(1, 'Position is required...'),
});
//# sourceMappingURL=employeeSchema.js.map