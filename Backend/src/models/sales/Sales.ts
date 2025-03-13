import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';
import ProductInventory from '../products/ProductInventory';

class Sales extends Model {
    public id!: number;
    public totalAmount!: number;
    public saleDate!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Sales.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        saleDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
        modelName: 'Sales',
        tableName: 'sales',
    },
);

export default Sales;
