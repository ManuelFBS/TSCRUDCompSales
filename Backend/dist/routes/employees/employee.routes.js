"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const employees_controller_1 = require("../../controllers/Employees/employees.controller");
const employeeRouter = express_1.default.Router();
exports.employeeRouter = employeeRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// ~ Proteger todas las rutas de empleados...
employeeRouter.use(asyncHandler(authMiddleware_1.authenticate));
employeeRouter.post('/employee/new', asyncHandler((0, authMiddleware_1.authorize)(['Owner'])), asyncHandler(employees_controller_1.createEmployee));
employeeRouter.get('/', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), employees_controller_1.getEmployees);
employeeRouter.get('/employee/search/:id?', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), asyncHandler(employees_controller_1.getEmployeeByIdDni));
employeeRouter.put('/employee/edit/:id?', asyncHandler((0, authMiddleware_1.authorize)(['Owner'])), asyncHandler(employees_controller_1.updateEmployee));
employeeRouter.delete('/employee/delete/:id?', asyncHandler((0, authMiddleware_1.authorize)(['Owner'])), asyncHandler(employees_controller_1.deleteEmployee));
//# sourceMappingURL=employee.routes.js.map