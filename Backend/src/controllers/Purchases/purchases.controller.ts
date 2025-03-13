import { Request, Response } from 'express';
import models from '../../models';
import sequelize from '../../config/db';

const {
    ProductInventory,
    Purchases,
    PurchaseDetail,
    Supplier,
} = models;

export const registerPurchase = async (
    req: Request,
    res: Response,
) => {
    const { products, totalAmount, userId, supplierId } =
        req.body;

    const t = await sequelize.transaction();

    try {
        // * Se crea la compra...
        const purchase = await Purchases.create(
            {
                totalAmount,
                purchaseDate: new Date(),
                userId,
                supplierId,
            },
            { transaction: t },
        );

        // * Procesar cada producto de la compra...
        for (const product of products) {
            const {
                productCode,
                productName,
                description,
                unitPrice,
                quantity,
            } = product;

            // * Verificar si el producto ya existe en el inventario...
            let productInventory =
                await ProductInventory.findOne({
                    where: productCode,
                });

            if (!productInventory) {
                // > Si el producto no existe, crearlo...
                productInventory =
                    await ProductInventory.create(
                        {
                            productCode,
                            productName,
                            description,
                            unitPrice,
                            stock: quantity, // Stock inicial
                        },
                        { transaction: t },
                    );
            } else {
                // > Si el producto existe, actualizar el stock...
                productInventory.stock += quantity;
                await productInventory.save({
                    transaction: t,
                });
            }

            // * Crear el detalle de la compra...
            await PurchaseDetail.create(
                {
                    purchasesId: purchase.id,
                    productInventoryId: productInventory.id,
                    quantity,
                    unitPrice,
                    totalPrice: quantity * unitPrice,
                },
                { transaction: t },
            );
        }

        // * Confirmar la transacción...
        await t.commit();
        res.status(201).json({
            message: 'Compra creada exitosamente...!!!',
            purchase,
        });
    } catch (error) {
        // * Revertir la transacción en caso de error...
        await t.rollback();
        res.status(500).json({
            message: 'Error al crear la compra...!',
            error,
        });
    }
};
