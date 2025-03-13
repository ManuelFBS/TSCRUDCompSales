import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';
import ProductInventory from '../products/ProductInventory';

class Purchases extends Model {
    public id!: number;
    public totalAmount!: number;
    public purchaseDate!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Purchases.init(
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
        purchaseDate: {
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
        modelName: 'Purchases',
        tableName: 'purchases',
    },
);

export default Purchases;
