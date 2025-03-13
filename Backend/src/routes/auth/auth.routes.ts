import express from 'express';
import {
    login,
    logout,
} from '../../controllers/Auth/Auth.controller';
import exp from 'constants';
import { log } from 'console';

const authRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

authRouter.post('/login', asyncHandler(login));

authRouter.post('/logout', asyncHandler(logout));

export { authRouter };
