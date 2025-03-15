"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
// ~ Manejador de errores genérico de validación de datos...
const validateSchema = (schema, data) => {
    try {
        // * Validar los datos con el esquema proporcionado...
        return schema.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            // * Si hay un error de validación, devolver un mensaje de error 400...
            throw {
                status: 400,
                message: 'Error de validación...!',
                errors: error.errors,
            };
        }
        else {
            // * Si es otro tipo de error, devolver un error 500...
            throw {
                status: 500,
                message: 'Internal error server...!',
                error,
            };
        }
    }
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validationErrorHandler.js.map