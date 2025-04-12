"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const departments_controller_1 = require("../../controllers/Employees/departments.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const departmentRouter = express_1.default.Router();
exports.departmentRouter = departmentRouter;
// ~Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// ~Proteger las rutas de departamentos...
departmentRouter.use(asyncHandler(authMiddleware_1.authenticate));
departmentRouter.get('/', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), asyncHandler(departments_controller_1.getDepartmentByDni));
departmentRouter.put('/', asyncHandler((0, authMiddleware_1.authorize)(['Owner', 'Admin'])), asyncHandler(departments_controller_1.updateDepartment));
//# sourceMappingURL=department.routes.js.map