import { create } from 'zustand';
import api from '../api/api';
import {
    Employee,
    Department,
    EmployeeStatus,
    EmployeeWithDetails,
    ApiResponse,
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
            // const response = await api.get('/employees');
            const response =
                await api.get<ApiResponse<Employee[]>>('/employees');

            set({
                employees: response.data.data,
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
