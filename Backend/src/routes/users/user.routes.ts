import express from 'express';
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

userRouter.post('/user/new', asyncHandler(createUser));

userRouter.get('/', getUsers);

userRouter.get(
    '/user/search/:id?',
    asyncHandler(getUserByIdDniUser),
);

userRouter.patch('/user/edit/:id', updateUser);

userRouter.delete('/user/delete/:id?', deleteUser);

export { userRouter };
