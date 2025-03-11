import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class BlacklistedToken extends Model {
    public id!: number;
    public token!: string;
}

BlacklistedToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'BlacklistedToken',
        tableName: 'blacklisted_tokens',
        timestamps: false,
    },
);

export default BlacklistedToken;
