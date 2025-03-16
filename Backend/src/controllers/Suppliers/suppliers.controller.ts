import { Request, Response } from 'express';
import { SupplierSchema } from '../../validations/schemas/supplierSchema/supplier.Schema';
import models from '../../models';
import sequelize from '../../config/db';
import { validateSchema } from '../../utils/validationErrorHandler';

const { Supplier } = models;

// ~ Registro de nuevo proveedor...
export const registerSupplier = async (
    req: Request,
    res: Response,
) => {
    try {
        // * Validar los datos de entrada usando la función genérica...
        const validatedData = validateSchema(
            SupplierSchema,
            req.body,
        );

        const t = await sequelize.transaction();

        try {
            const newSupplier = await Supplier.create(
                {
                    rif: validatedData.rif,
                    companyName: validatedData.companyName,
                    address: validatedData.address,
                    phone: validatedData.phone,
                    code: validatedData.code,
                    country: validatedData.country,
                },
                { transaction: t },
            );

            await t.commit();
            res.status(201).json({
                message:
                    'El nuevo Proveedor ha sido registrado exitosamente...!!!',
                newSupplier,
            });
        } catch (error) {
            await t.rollback();
            res.status(500).json({
                message:
                    'Error al intentar registrar al nuevo Proveedor...!',
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

export const getSuppliers = async (
    req: Request,
    res: Response,
) => {
    try {
        const suppliers = await Supplier.findAll({
            attributes: [
                'rif',
                'companyName',
                'address',
                'code',
                'country',
            ],
        });

        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            details:
                error?.toString() || 'Error desconocido',
        });
    }
};
