import express from 'express';
import {
    authenticate,
    authorize,
} from '../../middlewares/authMiddleware';
import {
    registerCustomer,
    getAllCustomers,
    getCustomerByIdDni,
} from '../../controllers/customers/customers.controller';

const customerRouter = express.Router();

const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

customerRouter.use(asyncHandler(authenticate));

customerRouter.post(
    '/customer/new',
    asyncHandler(authorize(['Owner', 'Admin', 'Employee'])),
    registerCustomer,
);

customerRouter.get(
    '/',
    asyncHandler(authorize(['Owner', 'Admin', 'Employee'])),
    getAllCustomers,
);

customerRouter.get(
    '/customer/search/:id?',
    asyncHandler(authorize(['Owner', 'Admin', 'Employee'])),
    asyncHandler(getCustomerByIdDni),
);

export { customerRouter };
