import express from 'express';
import {
    getDepartmentByDni,
    updateDepartment,
} from '../../controllers/Employees/departments.controller';

const departmentRouter = express.Router();

// ~Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

departmentRouter.get('/', asyncHandler(getDepartmentByDni));
departmentRouter.put('/', asyncHandler(updateDepartment));

export { departmentRouter };
