import express from 'express';
import {
    authenticate,
    authorize,
} from '../../middlewares/authMiddleware';
import {
    createUser,
    getUsers,
    getUserByIdDniUser,
    updateUser,
    deleteUser,
} from '../../controllers/users/users.controller';

const userRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// ~ Proteger todas las rutas de usuarios...
userRouter.use(asyncHandler(authenticate));

userRouter.post(
    '/user/new',
    asyncHandler(authorize(['Owner', 'Admin'])),
    asyncHandler(createUser),
);

userRouter.get(
    '/',
    asyncHandler(authorize(['Owner', 'Admin'])),
    getUsers,
);

userRouter.get(
    '/user/search/:id?',
    asyncHandler(authorize(['Owner', 'Admin'])),
    asyncHandler(getUserByIdDniUser),
);

userRouter.patch(
    '/user/edit/:id',
    asyncHandler(authorize(['Owner', 'Admin'])),
    updateUser,
);

userRouter.delete(
    '/user/delete/:id?',
    asyncHandler(authorize(['Owner', 'Admin'])),
    deleteUser,
);

export { userRouter };
