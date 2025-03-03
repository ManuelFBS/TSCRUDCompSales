import { Request, Response } from 'express';
import Employee from '../../models/employees/Employee';
import { EmployeeSchema } from '../../validations/schemas/employeeSchema/employeeSchema';
import { convertToMySQLDate } from '../../utils/DateFormatter';

// ~ Se crea un nuevo empleado...
export const createEmployee = async (
    req: Request,
    res: Response,
) => {
    try {
        // const {
        //     dni,
        //     name,
        //     lastName,
        //     birthDate,
        //     email,
        //     phone,
        //     country,
        //     // ? statusWork,
        //     // ? department,
        //     // ? position,
        // } = req.body;

        // * Validación de datos...
        const validatedData = EmployeeSchema.parse(
            req.body,
        );

        // * Formatear fecha...
        const formattedBirthDate = convertToMySQLDate(
            req.body.birthDate,
        );

        // * Validar conversión de fecha...
        if (!formattedBirthDate) {
            return res.status(400).json({
                error: 'Fecha de nacimiento inválida',
                message:
                    'Por favor, use el formato DD/MM/YYYY',
            });
        }

        const newEmployee = await Employee.create({
            dni: validatedData.dni,
            name: validatedData.name,
            lastName: validatedData.lastName,
            birthDate: formattedBirthDate,
            email: validatedData.email,
            phone: validatedData.phone,
            country: validatedData.country,
        });

        res.status(201).json({
            message: 'Employee created successfully...!!!',
            ID: newEmployee.id,
            DNI: newEmployee.dni,
            Nombres: newEmployee.name,
            Apellidos: newEmployee.lastName,
            FechaNacimiento: req.body.birthDate, // > Fecha original del input...
            FechaNacimientoFormateada: formattedBirthDate, // > Fecha en formato MySQL...
            Email: newEmployee.email,
            Telefono: newEmployee.phone,
            Pais: newEmployee.country,
            // ? EstadoLaboral: statusWork,
            // ? Departamento: department,
            // ? Cargo: position,
        });
    } catch (error: any) {
        // * Manejo de errores específicos
        if (error instanceof Error) {
            // > Si es un error estándar de JavaScript
            res.status(400).json({
                error: error.message,
                type: 'ValidationError',
            });
        } else {
            // * Para otros tipos de errores
            res.status(500).json({
                error: 'Error interno del servidor',
                details:
                    error?.toString() ||
                    'Error desconocido',
            });
        }
    }
};
