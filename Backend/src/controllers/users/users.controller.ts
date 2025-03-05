import { Request, Response } from 'express';
import { UserSchema } from '../../validations/schemas/userSchema/userSchema';
import models from '../../models';
import { buildUserWhereClause } from '../../helpers/user.helper';

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

        // * Se crea el usuario...
        const user = await User.create(validatedData);

        res.status(201).json(user);
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
            include: [
                {
                    model: Employee,
                    as: 'employee',
                },
            ],
        });

        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByIdUser = async (
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
            // const userEssentialData = {
            //     DNI: user.dni,
            //     Usuario: user.user,
            //     Rol: user.role,
            //     // Status: user.status,
            // };
            res.status(200).json(user);
            // res.status(200).json(userEssentialData);
        } else {
            res.status(404).json({
                error: 'User not found',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
