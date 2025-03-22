import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class Session extends Model {
    public id!: number;
    public dni!: string;
    public user!: string;
    public role!: string;
    public sessionInit!: Date;
    public sessionEnd!: Date;
}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sessionInit: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        sessionEnd: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Session',
        tableName: 'sessions',
        timestamps: false,
    },
);

export default Session;
