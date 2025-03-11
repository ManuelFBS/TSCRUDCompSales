import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth';
import model from '../models';
import models from '../models';

const { BlacklistedToken } = models;

// Extend Request type to include user property
interface AuthRequest extends Request {
    user?: {
        id: number;
        dni: string;
        role: string;
    };
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req
        .header('Authorization')
        ?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            error: 'Access denied. No token provided',
        });
    }

    try {
        // * Verificar si el token está en la lista negra...
        const isBlacklisted =
            await BlacklistedToken.findOne({
                where: { token },
            });

        if (isBlacklisted) {
            return res.status(401).json({
                error: 'Token is invalidated. Please log in again',
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: number;
            dni: string;
            role: string;
        };

        (req as AuthRequest).user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token',
        });
    }
};

export const authorize = (roles: string[]) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        // > Verificar si el usuario existe y si tiene un rol antes de verificar los permisos...
        const userRole = (req as AuthRequest).user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({
                error: 'Access denied. You need the appropriate authorization',
            });
        }
        next();
    };
};
