import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class EmployeeStatus extends Model {
    public id!: number;
    public dni!: string;
    public statusWork!: string;
}

EmployeeStatus.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dni: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        statusWork: {
            type: DataTypes.ENUM(
                'Activo',
                'Vacaciones',
                'Permiso remunerado',
                'Permiso no remunerado',
                'Permiso por Maternidad',
                'Permiso por Paternidad',
                'Permiso por Duelo Familiar',
                'Reposo Médico',
                'Suspensión',
                'Renuncia',
                'Despedido',
            ),
            allowNull: false,
            defaultValue: 'Activo',
        },
    },
    {
        sequelize,
        modelName: 'EmployeeStatus',
        tableName: 'employeeStatus',
        timestamps: false,
    },
);

export default EmployeeStatus;
