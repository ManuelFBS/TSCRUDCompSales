import { Request, Response } from 'express';
import { UserSchema } from '../../validations/schemas/userSchema/userSchema';
import models from '../../models';
import sequelize from '../../config/db';
import { validateSchema } from '../../utils/validationErrorHandler';
import { HashPassword } from '../../utils/authUtils';
import { buildUserWhereClause } from '../../helpers/user.helper';

const { User, Employee } = models;

export const createUser = async (
    req: Request,
    res: Response,
) => {
    try {
        const validatedData = validateSchema(
            UserSchema,
            req.body,
        );

        const t = await sequelize.transaction();

        try {
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
            const newUser = await User.create(
                {
                    dni: validatedData.dni,
                    user: validatedData.user,
                    password: validatedData.password,
                    role: validatedData.role,
                    status: validatedData.status,
                },
                { transaction: t },
            );

            await t.commit();

            res.status(201).json({
                message:
                    'New User has been created successfully...!!!',
                DNI: newUser.dni,
                Usuario: newUser.user,
                Rol: newUser.role,
                Status: newUser.status,
            });
        } catch (error: any) {
            await t.rollback();
            res.status(500).json({ error: error.message });
        }
    } catch (error: any) {
        // * Se captura el error lanzado por validateSchema...
        res.status(error.status || 500).json({
            message:
                error.message ||
                'Error interno del servidor',
            errors: error.errors || undefined,
        });
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
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    attributes: [
                        'name',
                        'lastName',
                        'email',
                        'phone',
                    ],
                },
            ],
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                error: 'User not found...!',
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
    try {
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

        if (updated) {
            const updatedUser = await User.findByPk(
                req.params.id,
                {
                    include: [
                        {
                            model: Employee,
                            as: 'employee',
                            attributes: [
                                'name',
                                'lastName',
                                'email',
                            ],
                        },
                    ],
                },
            );
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({
                error: 'User not found',
            });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
) => {
    const whereClause = buildUserWhereClause(req);

    try {
        const deleted = await User.destroy({
            where: { whereClause },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({
                error: 'User not found',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
