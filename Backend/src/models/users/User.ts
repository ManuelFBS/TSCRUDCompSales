import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class User extends Model {
    public id!: number;
    public dni!: string;
    public user!: string;
    public password!: string;
    public role!: string;
    public status!: string;
}

User.init(
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
        user: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(
                'Owner',
                'Admin',
                'Employee',
            ),
            allowNull: false,
            defaultValue: 'Employee',
        },
        status: {
            type: DataTypes.ENUM('Activo', 'Bloqueado'),
            allowNull: false,
            defaultValue: 'Activo',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
    },
);

export default User;
