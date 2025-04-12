import { create } from 'zustand';
import api from '../api/api';
import {
    Employee,
    Department,
    EmployeeStatus,
    EmployeeWithDetails,
} from '../types/employeeTypes';

interface EmployeeState {
    employees: Employee[];
    currentEmployee: EmployeeWithDetails | null;
    departments: Department[];
    employeeStatus: EmployeeStatus[];
    loading: boolean;
    error: string | null;
    fetchEmployees: () => Promise<void>;
    fetchEmployeeByDni: (dni: string) => Promise<void>;
    createEmployee: (
        employeeData: Omit<Employee, 'id'>,
        departmentData: Omit<Department, 'id'>,
        statusData: Omit<EmployeeStatus, 'id'>,
    ) => Promise<void>;
    updateEmployee: (
        dni: string,
        employeeData: Partial<Employee>,
        departmentData: Partial<Department>,
    ) => Promise<void>;
    deleteEmployee: (dni: string) => Promise<void>;
    searchEmployee: (dni: string) => Promise<void>;
    resetCurrentEmployee: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    employees: [],
    currentEmployee: null,
    departments: [],
    employeeStatus: [],
    loading: false,
    error: null,

    fetchEmployees: async () => {
        set({ loading: true, error: null });
        try {
            // const [employeesRes, departmentsRes, statusRes] = await Promise.all(
            //     [
            //         api.get('/employees'),
            //         api.get('/departments'),
            //         api.get('/employee-status'),
            //     ],
            // );
            // // Mapear los datos para combinar la información
            // const employeesWithDetails = employeesRes.data.map(
            //     (employee: Employee) => {
            //         const department = departmentsRes.data.find(
            //             (d: Department) => d.dni === employee.dni,
            //         );
            //         const status = statusRes.data.find(
            //             (s: EmployeeStatus) => s.dni === employee.dni,
            //         );
            //         return {
            //             ...employee,
            //             department: department?.department || '',
            //             position: department?.position || '',
            //             statusWork: status?.statusWork || 'Activo',
            //         };
            //     },
            // );
            // set({
            //     employees: employeesWithDetails,
            //     departments: departmentsRes.data,
            //     employeeStatus: statusRes.data,
            //     loading: false,
            // });

            const response = await api.get('/employees');

            set({
                employees: response.data,
                loading: false,
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchEmployeeByDni: async (dni: string) => {
        set({ loading: true, error: null });
        try {
            // const [employeeRes, departmentRes, statusRes] = await Promise.all([
            //     api.get(`/employees/employee/search?dni=${dni}`),
            //     api.get(`/departments?dni=${dni}`),
            //     api.get(`/employee-status?dni=${dni}`),
            // ]);

            // set({
            //     currentEmployee: {
            //         ...employeeRes.data,
            //         department: departmentRes.data.department || '',
            //         position: departmentRes.data.position || '',
            //         statusWork: statusRes.data.statusWork || 'Activo',
            //     },
            //     loading: false,
            // });

            const response = await api.get(
                `/employees/employee/search?dni=${dni}`,
            );

            set({
                currentEmployee: response.data,
                loading: false,
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    createEmployee: async (employeeData, departmentData, statusData) => {
        set({ loading: true, error: null });
        try {
            await api.post('/employees/employee/new', {
                employeeData,
                departmentData,
                statusData,
            });
            set({ loading: false });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    updateEmployee: async (dni, employeeData, departmentData) => {
        set({ loading: true, error: null });
        try {
            await api.put(`/employees/employee/edit?dni=${dni}`, {
                employeeData,
                departmentData,
            });
            set({ loading: false });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    deleteEmployee: async (dni) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/employees/employee/delete?dni=${dni}`);
            set({ loading: false });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    searchEmployee: async (dni) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(
                `/employees/employee/search?dni=${dni}`,
            );
            set({
                currentEmployee: response.data,
                loading: false,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    resetCurrentEmployee: () => {
        set({ currentEmployee: null });
    },
}));
