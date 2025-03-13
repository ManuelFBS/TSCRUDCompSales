import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/db';

class Supplier extends Model {
    public id!: number;
    public rif!: string;
    public companyName!: string;
    public address!: string;
    public code!: string;
    public country!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Supplier.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rif: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
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
        modelName: 'Supplier',
        tableName: 'suppliers',
    },
);

export default Supplier;
