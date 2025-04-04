import { create } from 'zustand';
import { User, UserFormData, UserWithEmployee } from '../types/user.types';
import { userApi } from '../api/user.api';

interface UserState {
    users: User[];
    selectedUser: UserWithEmployee | null;
    isLoading: boolean;
    error: string | null;

    // Acciones
    fetchUsers: () => Promise<void>;
    fetchUserByIdOrUser: (idOrUser: string) => Promise<void>;
    createUser: (userData: UserFormData) => Promise<void>;
    updateUser: (id: string, userData: Partial<UserFormData>) => Promise<void>;
    deleteUser: (idOrUser: string) => Promise<void>;
    resetError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const users = await userApi.getAll();
            set({ users, isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al cargar usuarios';
            set({ error: errorMessage, isLoading: false });
        }
    },

    fetchUserByIdOrUser: async (idOrUser: string) => {
        set({ isLoading: true, error: null });
        try {
            const user = await userApi.getByIdOrUser(idOrUser);
            set({ selectedUser: user, isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al cargar el usuario';
            set({ error: errorMessage, isLoading: false });
        }
    },

    createUser: async (userData: UserFormData) => {
        set({ isLoading: true, error: null });
        try {
            await userApi.create(userData);
            // Recargar la lista de usuarios
            await get().fetchUsers();
            set({ isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al crear el usuario';
            set({ error: errorMessage, isLoading: false });
        }
    },

    updateUser: async (id: string, userData: Partial<UserFormData>) => {
        set({ isLoading: true, error: null });
        try {
            await userApi.update(id, userData);
            // Recargar la lista de usuarios
            await get().fetchUsers();
            set({ isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al actualizar el usuario';
            set({ error: errorMessage, isLoading: false });
        }
    },

    deleteUser: async (idOrUser: string) => {
        set({ isLoading: true, error: null });
        try {
            await userApi.delete(idOrUser);
            // Recargar la lista de usuarios
            await get().fetchUsers();
            set({ isLoading: false });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Error al eliminar el usuario';
            set({ error: errorMessage, isLoading: false });
        }
    },

    resetError: () => set({ error: null }),
}));
