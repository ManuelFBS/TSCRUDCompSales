import express from 'express';
import {
    createUser,
    getUsers,
    getUserByIdUser,
} from '../../controllers/Users/users.controller';

const userRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

userRouter.post('/user/new', asyncHandler(createUser));

userRouter.get('/', getUsers);

export { userRouter };
