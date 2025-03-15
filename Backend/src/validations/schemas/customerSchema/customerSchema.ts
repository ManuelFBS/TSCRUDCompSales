import { z } from 'zod';

// ~ Esquema de validación del cliente...
export const CustomerSchema = z.object({
    dni: z.string().min(1, 'DNI is required...'),
    name: z.string().min(1, 'Name is required...'),
    lastName: z.string().min(1, 'Last name is required...'),
    address: z.string().min(1, 'Address is required...'),
    phone: z.string().min(5, 'Phone is required...'),
});
