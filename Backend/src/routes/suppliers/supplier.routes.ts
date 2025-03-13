import express from 'express';
import {
    authenticate,
    authorize,
} from '../../middlewares/authMiddleware';
import {
    registerSupplier,
    getSuppliers,
} from '../../controllers/Suppliers/suppliers.controller';

const supplierRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// ~ Proteger las rutas de Proveedores...
supplierRouter.use(asyncHandler(authenticate));

supplierRouter.post(
    '/supplier/new',
    asyncHandler(authorize(['Owner'])),
    registerSupplier,
);

supplierRouter.get(
    '/',
    asyncHandler(authorize(['Owner', 'Admin'])),
    getSuppliers,
);

export { supplierRouter };
