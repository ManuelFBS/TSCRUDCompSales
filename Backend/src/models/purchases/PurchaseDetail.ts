import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';
import Purchases from './Purchases';
import ProductInventory from '../products/ProductInventory';

class PurchaseDetail extends Model {
    public id!: number;
    public purchasesId!: number;
    public productInventoryId!: number;
    public quantity!: number;
    public unitPrice!: number;
    public totalPrice!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PurchaseDetail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        purchasesId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Purchases,
                key: 'id',
            },
        },
        productInventoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductInventory,
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'PurchaseDetail',
        tableName: 'purchase_detail',
    },
);

// ~ Actualiza el stock de un producto luego de una compra (adquisición)...
PurchaseDetail.afterCreate(
    async (purchaseDetail, options) => {
        const product = await ProductInventory.findByPk(
            purchaseDetail.productInventoryId,
        );

        if (product) {
            product.stock += purchaseDetail.quantity;
            await product.save();
        }
    },
);

export default PurchaseDetail;
