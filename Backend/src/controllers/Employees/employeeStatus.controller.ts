import { Request, Response } from 'express';
import models from '../../models';
import { buildEmployeeWhereClause } from '../../helpers/employee.helper';

const { EmployeeStatus } = models;

export const getEmployeeStatusByDni = async (
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

        const status = await EmployeeStatus.findOne({
            where: whereClause,
        });

        if (status) {
            res.status(200).json(status);
        } else {
            res.status(404).json({
                error: 'Employee status not found for this employee',
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEmployeeStatus = async (
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

        const [updated] = await EmployeeStatus.update(
            req.body,
            {
                where: whereClause,
            },
        );

        if (updated) {
            const updatedStatus =
                await EmployeeStatus.findOne({
                    where: whereClause,
                });
            res.status(200).json(updatedStatus);
        } else {
            res.status(404).json({
                error: 'Employee status not found',
            });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
