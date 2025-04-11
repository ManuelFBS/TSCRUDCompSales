import { Request, Response } from 'express';
import { EmployeeSchema } from '../../validations/schemas/employeeSchema/employeeSchema';
import { convertToMySQLDate } from '../../utils/DateFormatter';
import { buildEmployeeWhereClause } from '../../helpers/employee.helper';
import models from '../../models';
import sequelize from '../../config/db';
import { validateSchema } from '../../utils/validationErrorHandler';
import { User } from '../../models/relations';

const { Employee, Department, EmployeeStatus } = models;

// ~Helper para obtener empleado con toda su información...
const getFullEmployeeData = async (dni: string) => {
    const employee = await Employee.findOne({
        where: { dni },
    });
    //
    if (!employee) return null;

    const department = await Department.findOne({
        where: { dni },
    });
    const status = await EmployeeStatus.findOne({
        where: { dni },
    });

    return {
        ...employee.get({ plain: true }),
        department: department?.department,
        position: department?.position,
        statusWork: status?.statusWork,
    };
};

// ~ Se crea un nuevo empleado...
export const createEmployee = async (
    req: Request,
    res: Response,
) => {
    try {
        // * Validar los datos de entrada usando la función genérica
        const validatedData = validateSchema(
            EmployeeSchema,
            req.body,
        );

        const t = await sequelize.transaction();

        try {
            // * Formatear fecha...
            const formattedBirthDate = convertToMySQLDate(
                req.body.birthDate,
            );

            // * Validar conversión de fecha...
            if (!formattedBirthDate) {
                return res.status(400).json({
                    error: 'Fecha de nacimiento inválida',
                    message:
                        'Por favor, use el formato DD-MM-YYYY',
                });
            }

            const newEmployee = await Employee.create(
                {
                    dni: validatedData.dni,
                    name: validatedData.name,
                    lastName: validatedData.lastName,
                    birthDate: formattedBirthDate,
                    email: validatedData.email,
                    phone: validatedData.phone,
                    country: validatedData.country,
                },
                { transaction: t },
            );

            // * Crear registro en Department...
            const dept = await Department.create(
                {
                    dni: newEmployee.dni,
                    department: req.body.department,
                    position: req.body.position,
                },
                { transaction: t },
            );

            // * Crear registro en EmployeeStatus...
            const statusEmp = await EmployeeStatus.create(
                {
                    dni: newEmployee.dni,
                    statusWork: 'Activo',
                },
                { transaction: t },
            );

            await t.commit();

            // res.status(201).json({
            //     message:
            //         'Employee created successfully...!!!',
            //     ID: newEmployee.id,
            //     DNI: newEmployee.dni,
            //     Nombres: newEmployee.name,
            //     Apellidos: newEmployee.lastName,
            //     FechaNacimiento: req.body.birthDate, // > Fecha original del input...
            //     FechaNacimientoFormateada:
            //         formattedBirthDate, // > Fecha en formato MySQL...
            //     Email: newEmployee.email,
            //     Telefono: newEmployee.phone,
            //     Pais: newEmployee.country,
            //     EstadoLaboral: statusEmp.statusWork,
            //     Departamento: dept.department,
            //     Cargo: dept.position,
            // });

            res.status(201).json({
                ...newEmployee.get({ plain: true }),
                department: dept.department,
                position: dept.position,
                statusWork: statusEmp.statusWork,
            });
        } catch (error: any) {
            await t.rollback();

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
    } catch (error: any) {
        // * Se captura el error lanzado por validateSchema...
        res.status(error.status || 500).json({
            message:
                error.message ||
                'Error interno del servidor',
            errors: error.errors || undefined,
        });
    }
};

// ~Se obtienen todos los empleados...
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

        const employeeDetails = await Promise.all(
            employees.map(async (emp) => {
                const department = await Department.findOne(
                    { where: { dni: emp.dni } },
                );
                //
                const status = await EmployeeStatus.findOne(
                    { where: { dni: emp.dni } },
                );

                return {
                    ...emp.get({ plain: true }),
                    department: department?.department,
                    position: department?.position,
                    statusWork: status?.statusWork,
                };
            }),
        );

        // !res.status(200).json(employees);
        res.status(200).json(employeeDetails);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            details:
                error?.toString() || 'Error desconocido',
        });
    }
};

// ~Se obtienen un empleado determinado...
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

        // !const employee = await Employee.findOne({
        //  !   where: whereClause,
        // !});

        const fullEmployeeData = await getFullEmployeeData(
            req.params.dni,
        );

        if (fullEmployeeData) {
            res.status(200).json(fullEmployeeData);
        } else {
            res.status(404).json({
                error: 'Employee not found...!',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// ~Se actualizan los datos de un empleado...
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

        //  !const [updated] = await Employee.update(
        //  !   validatedData,
        //  !  {
        //  !       where: whereClause,
        //  !  },
        // !);

        // !if (updated) {
        // !   const updatedEmployee = await Employee.findOne({
        // !      where: whereClause,
        // !   });

        //  !   res.status(200).json(updatedEmployee);
        // ! } else {
        // !    res.status(404).json({
        // !       error: 'Employee not found',
        // !   });
        // ! }

        const t = await sequelize.transaction();

        try {
            const [updated] = await Employee.update(
                validatedData,
                {
                    where: whereClause,
                    transaction: t,
                },
            );

            if (!updated) {
                await t.rollback();
                return res.status(404).json({
                    error: 'Employee not found',
                });
            }

            // *Actualizar departamento si se proporciona en el body...
            if (req.body.department || req.body.position) {
                await Department.update(
                    {
                        department: req.body.department,
                        position: req.body.position,
                    },
                    {
                        where: whereClause,
                        transaction: t,
                    },
                );
            }

            await t.commit();
            const updatedEmployee =
                await getFullEmployeeData(req.body.dni);

            res.status(200).json(updatedEmployee);
        } catch (error: any) {
            await t.rollback();
            throw error;
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// ~Se elimina un empleado...
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

        // !const deleted = await Employee.destroy({
        // !    where: whereClause,
        // !});

        // !if (deleted) {
        // !    res.status(200).json({
        // !        message: 'Employee has been deleted...!!!',
        // !    });
        // !} else {
        // !    res.status(404).json({
        // !        message: 'Employee not found...!',
        // !    });
        // !}
        const t = await sequelize.transaction();

        try {
            // *Eliminar en cascada...
            await Promise.all([
                User.destroy({
                    where: whereClause,
                    transaction: t,
                }),
                Department.destroy({
                    where: whereClause,
                    transaction: t,
                }),
                EmployeeStatus.destroy({
                    where: whereClause,
                    transaction: t,
                }),
                Employee.destroy({
                    where: whereClause,
                    transaction: t,
                }),
            ]);

            await t.commit();
            res.status(200).json({
                message:
                    'Employee and all related data has been deleted...!!!',
            });
        } catch (error: any) {
            await t.rollback();
            throw error;
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
