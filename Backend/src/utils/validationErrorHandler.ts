import { ZodError, ZodSchema } from 'zod';

// ~ Manejador de errores genérico de validación de datos...
export const validateSchema = (
    schema: ZodSchema,
    data: any,
) => {
    try {
        // * Validar los datos con el esquema proporcionado...
        return schema.parse(data);
    } catch (error) {
        if (error instanceof ZodError) {
            // * Si hay un error de validación, devolver un mensaje de error 400...
            throw {
                status: 400,
                message: 'Error de validación...!',
                errors: error.errors,
            };
        } else {
            // * Si es otro tipo de error, devolver un error 500...
            throw {
                status: 500,
                message: 'Internal error server...!',
                error,
            };
        }
    }
};
