import { Request, Response } from 'express';
import models from '../../models';
import sequelize from '../../config/db';

const { Supplier } = models;

export const registerSupplier = async (
    req: Request,
    res: Response,
) => {
    const { rif, companyName, address, code, country } =
        req.body;

    const t = await sequelize.transaction();

    try {
        const newSupplier = await Supplier.create(
            {
                rif,
                companyName,
                address,
                code,
                country,
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
};
