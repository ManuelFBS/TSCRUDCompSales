"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeStatusRouter = void 0;
const express_1 = __importDefault(require("express"));
const employeeStatus_controller_1 = require("../../controllers/Employees/employeeStatus.controller");
const employeeStatusRouter = express_1.default.Router();
exports.employeeStatusRouter = employeeStatusRouter;
// *Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
employeeStatusRouter.get('/', asyncHandler(employeeStatus_controller_1.getEmployeeStatusByDni));
employeeStatusRouter.put('/', asyncHandler(employeeStatus_controller_1.updateEmployeeStatus));
//# sourceMappingURL=employeeStatus.routes.js.map