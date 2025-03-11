"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const relations_1 = require("./relations");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});
const models = {
    Employee: relations_1.Employee,
    User: relations_1.User,
    EmployeeStatus: relations_1.EmployeeStatus,
    Department: relations_1.Department,
    BlacklistedToken: relations_1.BlacklistedToken,
    sequelize,
};
exports.default = models;
//# sourceMappingURL=index.js.map