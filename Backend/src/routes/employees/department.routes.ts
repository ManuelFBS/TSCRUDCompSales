import express from 'express';
import {
    getDepartmentByDni,
    updateDepartment,
} from '../../controllers/Employees/departments.controller';
import {
    authenticate,
    authorize,
} from '../../middlewares/authMiddleware';

const departmentRouter = express.Router();

// ~Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// ~Proteger las rutas de departamentos...
departmentRouter.use(asyncHandler(authenticate));

departmentRouter.get(
    '/',
    asyncHandler(authorize(['Owner', 'Admin'])),
    asyncHandler(getDepartmentByDni),
);
departmentRouter.put(
    '/',
    asyncHandler(authorize(['Owner', 'Admin'])),
    asyncHandler(updateDepartment),
);

export { departmentRouter };
