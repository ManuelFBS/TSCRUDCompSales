import e, { Request, Response } from 'express';
import Employee from '../../models/employees/Employee';
import { EmployeeSchema } from '../../validations/schemas/employeeSchema/employeeSchema';
import { convertToMySQLDate } from '../../utils/DateFormatter';
import { buildEmployeeWhereClause } from '../../helpers/employee.helper';

// ~ Se crea un nuevo empleado...
export const createEmployee = async (
    req: Request,
    res: Response,
) => {
    try {
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

export const getEmployees = async (
    req: Request,
    res: Response,
) => {
    try {
        const employees = await Employee.findAll({
            attributes: [
                'dni',
                'name',
                'lastName',
                'email',
                'phone',
            ],
        });

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            details:
                error?.toString() || 'Error desconocido',
        });
    }
};

export const getEmployeeByIdDni = async (
    req: Request,
    res: Response,
) => {
    try {
        const whereClause = buildEmployeeWhereClause(req);

        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }

        const employee = await Employee.findOne({
            where: whereClause,
        });

        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({
                error: 'Employee not found...!',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEmployee = async (
    req: Request,
    res: Response,
) => {
    try {
        const whereClause = buildEmployeeWhereClause(req);

        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }

        const validatedData = EmployeeSchema.parse(
            req.body,
        ); // > Valida los datos de entrada...

        const [updated] = await Employee.update(
            validatedData,
            {
                where: whereClause,
            },
        );

        if (updated) {
            const updatedEmployee = await Employee.findOne({
                where: whereClause,
            });

            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).json({
                error: 'Employee not found',
            });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteEmployee = async (
    req: Request,
    res: Response,
) => {
    try {
        const whereClause = buildEmployeeWhereClause(req);

        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }

        const deleted = await Employee.destroy({
            where: whereClause,
        });

        if (deleted) {
            res.status(200).json({
                message: 'Employee has been deleted...!!!',
            });
        } else {
            res.status(404).json({
                message: 'Employee not found...!',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
