"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const departments_controller_1 = require("../../controllers/Employees/departments.controller");
const departmentRouter = express_1.default.Router();
exports.departmentRouter = departmentRouter;
// ~Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
departmentRouter.get('/', asyncHandler(departments_controller_1.getDepartmentByDni));
departmentRouter.put('/', asyncHandler(departments_controller_1.updateDepartment));
//# sourceMappingURL=department.routes.js.map