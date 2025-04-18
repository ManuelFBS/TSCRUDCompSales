import { Request, Response } from 'express';
import models from '../../models';
import { buildEmployeeWhereClause } from '../../helpers/employee.helper';

const { Department } = models;

export const getDepartmentByDni = async (
    req: Request,
    res: Response,
) => {
    try {
        const whereClause = buildEmployeeWhereClause(req);

        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }

        const department = await Department.findOne({
            where: whereClause,
        });

        if (department) {
            res.status(200).json(department);
        } else {
            res.status(404).json({
                error: 'Department not found for this employee',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDepartment = async (
    req: Request,
    res: Response,
) => {
    try {
        const whereClause = buildEmployeeWhereClause(req);

        if (!whereClause) {
            return res.status(400).json({
                error: 'You must provide either an id or a dni',
            });
        }

        const [updated] = await Department.update(
            req.body,
            {
                where: whereClause,
            },
        );

        if (updated) {
            const updatedDepartment =
                await Department.findOne({
                    where: whereClause,
                });
            res.status(200).json(updatedDepartment);
        } else {
            res.status(404).json({
                error: 'Department not found',
            });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
