import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ComparePassword } from '../../utils/authUtils';
import models from '../../models';
import {
    JWT_SECRET,
    JWT_EXPIRES_IN,
} from '../../config/auth';

const { BlacklistedToken, Employee, User, Session } =
    models;

export const login = async (
    req: Request,
    res: Response,
) => {
    try {
        const { user, password } = req.body;

        // * Buscar el usuario en la base de datos...
        const foundUser = await User.findOne({
            where: { user },
        });

        if (!foundUser) {
            return res
                .status(404)
                .json({ error: 'User not found...!' });
        }

        // * Se obtiene datos puntuales del empleado asociado con el usuario...
        const employee = await Employee.findOne({
            where: { dni: foundUser.dni },
            attributes: ['name', 'lastName'],
        });

        // * Se verifica el password...
        const isPasswordValid = await ComparePassword(
            password,
            foundUser.password,
        );

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ error: 'Invalid password...!' });
        }

        // * Generar el token JWT...
        const token = jwt.sign(
            {
                id: foundUser.id,
                dni: foundUser.dni,
                role: foundUser.role,
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN,
            } as jwt.SignOptions, // > Forzar el tipo de expiresIn...
        );

        // * Se registra la sesión de inicio...
        await Session.create({
            dni: foundUser.dni,
            user: foundUser.user,
            role: foundUser.role,
            sessionInit: new Date(),
        });

        // * Se envía el token de respuesta...
        res.status(200).json({
            token,
            user: {
                id: foundUser.id,
                dni: foundUser.dni,
                role: foundUser.role,
            },
            fullName:
                employee?.name + ' ' + employee?.lastName,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const logout = async (
    req: Request,
    res: Response,
) => {
    try {
        const token = req
            .header('Authorization')
            ?.replace('Bearer ', '');

        if (!token) {
            return res
                .status(400)
                .json({ error: 'No token provided' });
        }

        // * Decodificar el token para obtener el DNI del usuario...
        const decoded = jwt.verify(token, JWT_SECRET) as {
            dni: string;
        };

        // * Se busca la sesión activa del usuario...
        const activeSession = await Session.findOne({
            where: {
                dni: decoded.dni,
                sessionEnd: null,
            },
        });

        if (activeSession) {
            // > Registrar la hora de cierre de la sesión...
            activeSession.sessionEnd = new Date();
            await activeSession.save();
        }

        // * Agregar el token a la lista negra...
        await BlacklistedToken.create({ token });

        res.status(200).json({
            message: 'Logged out successfully',
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
