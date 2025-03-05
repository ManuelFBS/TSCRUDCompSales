import { z } from 'zod';

// ~ Esquema de validación del usuario...
export const UserSchema = z.object({
    dni: z.string().min(1, 'DNI is required...'),
    user: z.string().min(5, 'User is required...'),
    password: z.string().min(6, 'Password is required...'),
    role: z.enum(['Owner', 'Admin', 'Employee']),
});
