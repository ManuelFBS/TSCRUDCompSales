"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dni: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    user: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('Owner', 'Admin', 'Employee'),
        allowNull: false,
        defaultValue: 'Employee',
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Activo', 'Bloqueado'),
        allowNull: false,
        defaultValue: 'Activo',
    },
}, {
    sequelize: db_1.default,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
exports.default = User;
//# sourceMappingURL=User.js.map