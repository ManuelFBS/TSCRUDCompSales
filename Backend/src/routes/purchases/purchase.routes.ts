import express from 'express';
import {
    authenticate,
    authorize,
} from '../../middlewares/authMiddleware';
import { registerPurchase } from '../../controllers/Purchases/purchases.controller';
import exp from 'constants';

const purchaseRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// ~ Proteger las rutas de Purchases...
purchaseRouter.use(asyncHandler(authenticate));

purchaseRouter.post(
    '/purchase/new',
    asyncHandler(authorize(['Owner', 'Admin'])),
    registerPurchase,
);

export { purchaseRouter };
