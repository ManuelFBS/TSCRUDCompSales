import express from 'express';
import {
    getEmployeeStatusByDni,
    updateEmployeeStatus,
} from '../../controllers/Employees/employeeStatus.controller';

const employeeStatusRouter = express.Router();

// *Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

employeeStatusRouter.get(
    '/',
    asyncHandler(getEmployeeStatusByDni),
);
employeeStatusRouter.put(
    '/',
    asyncHandler(updateEmployeeStatus),
);

export { employeeStatusRouter };
