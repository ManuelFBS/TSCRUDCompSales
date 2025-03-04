import { Request } from 'express';
import { WhereOptions } from 'sequelize';

/*
   + Se construye el objeto `whereClause` para buscar un empleado por id o dni...
   + @param req - El objeto Request de Express...
   + @returns Un objeto con la condición de búsqueda o null si no se proporciona ni id ni dni.
 */

export const buildEmployeeWhereClause = (
    req: Request,
): WhereOptions | null => {
    const { id } = req.params; // > Se obtiene el id de los parámetros de la ruta...
    const { dni } = req.query; // > Se obtiene el dni de los query parameters...

    if (id) {
        return { id }; // > Buscar por id...
    } else if (dni) {
        return { dni: dni as string }; // > Buscar por dni...
    } else {
        return null;
    }
};
