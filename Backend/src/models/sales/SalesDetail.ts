import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';
import Sales from './Sales';
import ProductInventory from '../products/ProductInventory';

class SalesDetail extends Model {
    public id!: number;
    public salesId!: number;
    public productInventoryId!: number;
    public quantity!: number;
    public unitPrice!: number;
    public totalPrice!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SalesDetail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        salesId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Sales,
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
        modelName: 'SalesDetail',
        tableName: 'sales_detail',
    },
);

// ~ Actualiza el stock de un producto luego de una venta...
SalesDetail.afterCreate(async (salesDetail, options) => {
    const product = await ProductInventory.findByPk(
        salesDetail.productInventoryId,
    );

    if (product) {
        product.stock -= salesDetail.quantity;
        await product.save();
    }
});

export default SalesDetail;
