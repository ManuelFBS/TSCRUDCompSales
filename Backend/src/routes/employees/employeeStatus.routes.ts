import express from 'express';
import {
    getEmployeeStatusByDni,
    updateEmployeeStatus,
} from '../../controllers/Employees/employeeStatus.controller';
import {
    authenticate,
    authorize,
} from '../../middlewares/authMiddleware';

const employeeStatusRouter = express.Router();

// *Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// ~Proteger las rutas del estado del empleado...
employeeStatusRouter.use(asyncHandler(authenticate));

employeeStatusRouter.get(
    '/',
    asyncHandler(authorize(['Owner', 'Admin'])),
    asyncHandler(getEmployeeStatusByDni),
);
employeeStatusRouter.put(
    '/',
    asyncHandler(authorize(['Owner', 'Admin'])),
    asyncHandler(updateEmployeeStatus),
);

export { employeeStatusRouter };
