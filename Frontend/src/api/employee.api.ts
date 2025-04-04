import axios from '../utils/axios.config';
import {
    Employee,
    EmployeeFormData,
    EmployeeWithDetails,
} from '../types/employee.types';

export const employeeApi = {
    // *Obtener todos los empleados...
    getAll: async (): Promise<Employee[]> => {
        const response = await axios.get('/employees');
        return response.data;
    },

    // ~Obtener un empleado por ID o DNI...
    getByIdOrDni: async (idOrDni: string): Promise<EmployeeWithDetails> => {
        const response = await axios.get(
            `/employees/employee/search/${idOrDni}`,
        );
        return response.data;
    },

    // ~Crear un nuevo empleado...
    create: async (employeeData: EmployeeFormData): Promise<Employee> => {
        const response = await axios.post(
            '/employees/employee/new',
            employeeData,
        );
        return response.data;
    },

    // ~Actualizar un empleado...
    update: async (
        idOrDni: string,
        employeeData: Partial<EmployeeFormData>,
    ): Promise<Employee> => {
        const response = await axios.put(
            `/employees/employee/edit/${idOrDni}`,
            employeeData,
        );
        return response.data;
    },

    // ~Eliminar un empleado...
    delete: async (idOrDni: string): Promise<void> => {
        await axios.delete(`/employees/employee/delete/${idOrDni}`);
    },
};
