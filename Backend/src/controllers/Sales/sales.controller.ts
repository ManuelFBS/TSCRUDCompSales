import { Request, Response } from 'express';
import models from '../../models';
import sequelize from '../../config/db';

const { Sales, SalesDetail, Customer, ProductInventory } =
    models;

export const registerSale = async (
    req: Request,
    res: Response,
) => {
    const { products, totalAmount, tax, userId, customer } =
        req.body;

    const t = await sequelize.transaction();

    try {
        //
    } catch (error) {
        //
    }
};
