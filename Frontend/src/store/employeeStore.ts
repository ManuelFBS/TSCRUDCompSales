import { create } from 'zustand';
import {
    Employee,
    EmployeeFormData,
    EmployeeWithDetails,
} from '../types/employee.types';
import { employeeApi } from '../api/employee.api';

interface EmployeeState {
    employees: Employee[];
    selectedEmployee: EmployeeWithDetails | null;
    isLoading: boolean;
    error: string | null;

    // Acciones
    fetchEmployees: () => Promise<void>;
    fetchEmployeeByIdOrDni: (idOrDni: string) => Promise<void>;
    createEmployee: (employeeData: EmployeeFormData) => Promise<void>;
    updateEmployee: (
        idOrDni: string,
        employeeData: Partial<EmployeeFormData>,
    ) => Promise<void>;
    deleteEmployee: (idOrDni: string) => Promise<void>;
    resetError: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
    employees: [],
    selectedEmployee: null,
    isLoading: false,
    error: null,

    fetchEmployees: async () => {
        set({ isLoading: true, error: null });
        try {
            const employees = await employeeApi.getAll();
            set({ employees, isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al cargar empleados';
            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchEmployeeByIdOrDni: async (idOrDni: string) => {
        set({ isLoading: true, error: null });
        try {
            const employee = await employeeApi.getByIdOrDni(idOrDni);
            set({ selectedEmployee: employee, isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al cargar el empleado';
            set({ error: errorMessage, isLoading: false });
        }
    },

    createEmployee: async (employeeData: EmployeeFormData) => {
        set({ isLoading: true, error: null });
        try {
            await employeeApi.create(employeeData);
            // Recargar la lista de empleados
            await get().fetchEmployees();
            set({ isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al crear el empleado';
            set({ error: errorMessage, isLoading: false });
        }
    },

    updateEmployee: async (
        idOrDni: string,
        employeeData: Partial<EmployeeFormData>,
    ) => {
        set({ isLoading: true, error: null });
        try {
            await employeeApi.update(idOrDni, employeeData);
            // Recargar la lista de empleados
            await get().fetchEmployees();
            set({ isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al actualizar el empleado';
            set({ error: errorMessage, isLoading: false });
        }
    },

    deleteEmployee: async (idOrDni: string) => {
        set({ isLoading: true, error: null });
        try {
            await employeeApi.delete(idOrDni);
            // Recargar la lista de empleados
            await get().fetchEmployees();
            set({ isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al eliminar el empleado';
            set({ error: errorMessage, isLoading: false });
        }
    },

    resetError: () => set({ error: null }),
}));
