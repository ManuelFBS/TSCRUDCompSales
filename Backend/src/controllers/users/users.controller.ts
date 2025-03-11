import { Request, Response } from 'express';
import { UserSchema } from '../../validations/schemas/userSchema/userSchema';
import models from '../../models';
import { HashPassword } from '../../utils/authUtils';
import { buildUserWhereClause } from '../../helpers/user.helper';
import { isAwaitKeyword } from 'typescript';

const { User, Employee } = models;

export const createUser = async (
    req: Request,
    res: Response,
) => {
    try {
        const validatedData = UserSchema.parse(req.body);

        // * Se verificar si el empleado existe...
        const employee = await Employee.findOne({
            where: { dni: validatedData.dni },
        });

        if (!employee) {
            return res.status(404).json({
                error: 'Employee not found...!',
            });
        }

        // * Se procede a encriptar el password...
        const hashedPassword = await HashPassword(
            validatedData.password,
        );
        //
        validatedData.password = hashedPassword;

        // * Se crea el usuario...
        const user = await User.create(validatedData);

        res.status(201).json({
            message:
                'New User has been created successfully...!!!',
            DNI: user.dni,
            Usuario: user.user,
            Rol: user.role,
            Status: user.status,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (
    req: Request,
    res: Response,
) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'dni', 'user', 'role'],
        });

        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByIdDniUser = async (
    req: Request,
    res: Response,
) => {
    try {
        const whereClause = buildUserWhereClause(req);

        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a user...',
            });
        }

        const user = await User.findOne({
            where: whereClause,
        });

        if (user) {
            const userEssentialData = {
                ID: user.id,
                DNI: user.dni,
                Usuario: user.user,
                Rol: user.role,
                Status: user.status,
            };

            res.status(200).json(userEssentialData);
        } else {
            res.status(404).json({
                error: 'User not found',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
) => {
    const validatedData = UserSchema.parse(req.body);

    // * Si se proporciona una nueva contraseña, encriptarla...
    if (validatedData.password) {
        validatedData.password = await HashPassword(
            validatedData.password,
        );
    }

    const [updated] = await User.update(validatedData, {
        where: { id: req.params.id },
    });

    // if (updated) {
    //     const updatedUser = await User.findByPk;
    // }
};
