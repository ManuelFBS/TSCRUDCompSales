"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
class EmployeeStatus extends sequelize_1.Model {
}
EmployeeStatus.init({
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
    statusWork: {
        type: sequelize_1.DataTypes.ENUM('Activo', 'Vacaciones', 'Permiso remunerado', 'Permiso no remunerado', 'Permiso por Maternidad', 'Permiso por Paternidad', 'Permiso por Duelo Familiar', 'Reposo Médico', 'Suspensión', 'Renuncia', 'Despedido'),
        allowNull: false,
        defaultValue: 'Activo',
    },
}, {
    sequelize: db_1.default,
    modelName: 'EmployeeStatus',
    tableName: 'employeeStatus',
    timestamps: false,
});
exports.default = EmployeeStatus;
//# sourceMappingURL=EmployeeStatus.js.map