import express from 'express';
import {
    authenticate,
    authorize,
} from '../../middlewares/authMiddleware';
import {
    createEmployee,
    getEmployees,
    getEmployeeByIdDni,
    updateEmployee,
    deleteEmployee,
} from '../../controllers/Employees/employees.controller';

const employeeRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// ~ Proteger todas las rutas de empleados...
employeeRouter.use(asyncHandler(authenticate));

employeeRouter.post(
    '/employee/new',
    asyncHandler(authorize(['Owner'])),
    asyncHandler(createEmployee),
);

employeeRouter.get(
    '/',
    asyncHandler(authorize(['Owner', 'Admin'])),
    getEmployees,
);

employeeRouter.get(
    '/employee/search/:id?',
    asyncHandler(authorize(['Owner', 'Admin'])),
    asyncHandler(getEmployeeByIdDni),
);

employeeRouter.put(
    '/employee/edit/:id?',
    asyncHandler(authorize(['Owner'])),
    asyncHandler(updateEmployee),
);

employeeRouter.delete(
    '/employee/delete/:id?',
    asyncHandler(authorize(['Owner'])),
    asyncHandler(deleteEmployee),
);

export { employeeRouter };
