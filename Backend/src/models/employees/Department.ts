import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class Department extends Model {
    public id!: number;
    public dni!: string;
    public department!: string;
    public position!: string;
}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dni: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Department',
        tableName: 'departments',
        timestamps: false,
    },
);

export default Department;
