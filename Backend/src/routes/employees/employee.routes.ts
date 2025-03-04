import express from 'express';
import {
    createEmployee,
    getEmployees,
    getEmployeeByIdDni,
} from '../../controllers/Employees/employees.controller';

const employeeRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

employeeRouter.post(
    '/employee/new',
    asyncHandler(createEmployee),
);

employeeRouter.get('/', getEmployees);

employeeRouter.get(
    '/employee/search/:id?',
    asyncHandler(getEmployeeByIdDni),
);

export { employeeRouter };
