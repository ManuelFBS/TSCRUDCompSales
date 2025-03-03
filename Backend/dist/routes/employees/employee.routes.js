"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRouter = void 0;
const express_1 = __importDefault(require("express"));
const employees_controller_1 = require("../../controllers/Employees/employees.controller");
const employeeRouter = express_1.default.Router();
exports.employeeRouter = employeeRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
employeeRouter.post('/employee/new', asyncHandler(employees_controller_1.createEmployee));
//# sourceMappingURL=employee.routes.js.map