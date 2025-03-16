import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';
import User from '../users/User';
import Customer from '../customers/Customer';

class Sales extends Model {
    public id!: number;
    public totalAmount!: number;
    public tax!: number;
    public saleDate!: Date;
    public userId!: number;
    public customerId!: number;
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
        tax: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        saleDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        customerId: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: Customer,
                key: 'id',
            },
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
