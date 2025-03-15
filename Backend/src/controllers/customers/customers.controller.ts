import { Request, Response } from 'express';
import { CustomerSchema } from '../../validations/schemas/customerSchema/customerSchema';
import { buildEmployeeWhereClause } from '../../helpers/employee.helper';
import models from '../../models';
import sequelize from '../../config/db';
import { validateSchema } from '../../utils/validationErrorHandler';

const { Customer } = models;

// ~ Registro de nuevo cliente...
export const registerCustomer = async (
    req: Request,
    res: Response,
) => {
    try {
        // * Validar los datos de entrada usando la función genérica
        const validatedData = validateSchema(
            CustomerSchema,
            req.body,
        );

        const t = await sequelize.transaction();

        try {
            const newCustomer = await Customer.create(
                {
                    dni: validatedData.dni,
                    name: validatedData.name,
                    lastName: validatedData.lastName,
                    address: validatedData.address,
                    phone: validatedData.phone,
                },
                { transaction: t },
            );

            await t.commit();
            res.status(201).json({
                message:
                    'El nuevo Cliente ha sido registrado exitosamente...!!!',
                newCustomer,
            });
        } catch (error) {
            await t.rollback();
            res.status(500).json({
                message:
                    'Error al intentar registrar al nuevo Cliente...!',
                error,
            });
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

export const getAllCustomers = async (
    req: Request,
    res: Response,
) => {
    try {
        const customers = await Customer.findAll({
            attributes: [
                'dni',
                'name',
                'lastName',
                'address',
            ],
        });

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            details:
                error?.toString() || 'Error desconocido',
        });
    }
};

export const getCustomerByIdDni = async (
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

        const customer = await Customer.findOne({
            where: whereClause,
        });

        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({
                error: 'Customer not found...!',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
