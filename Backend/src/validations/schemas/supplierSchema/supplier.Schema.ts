import { z } from 'zod';

// ~ Esquema de validación del proveedor...
export const SupplierSchema = z.object({
    rif: z.string().min(5, 'Rif is required'),
    companyName: z
        .string()
        .min(5, 'Company Name is required...'),
    address: z.string().min(5, 'Address is reqired...'),
    code: z.string().min(3, 'Code Supplier is required...'),
    country: z.string().min(3, 'Country is required...'),
});
