"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
// ? import { EmployeeSchema } from '../../validations/schemas/employeeSchema/employeeSchema';
class Employee extends sequelize_1.Model {
}
Employee.init({
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
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(15),
        unique: true,
        allowNull: false,
    },
    country: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: db_1.default,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: false,
});
exports.default = Employee;
//# sourceMappingURL=Employee.js.map