import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/api';

interface AuthState {
    token: string | null;
    user: {
        id: number;
        dni: string;
        role: string;
    } | null;
    login: (
        token: string,
        user: { id: number; dni: string; role: string },
    ) => void;
    logout: () => Promise<void>;
    isAuthenticated: () => boolean;
    hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            login: (token, user) => {
                set({ token, user });
                localStorage.setItem('token', token);
            },
            logout: async () => {
                try {
                    // *Llamar al endpoint de logout en el backend...
                    await api.post('/auth/logout');
                } catch (error) {
                    console.error('Error during logout: ', error);
                } finally {
                    // *Limpiar el estado independientemente del resultado...
                    set({ token: null, user: null });
                    localStorage.removeItem('token');
                }
            },
            isAuthenticated: () => !!get().token,
            hasRole: (role) => {
                const currentUser = get().user;
                return currentUser?.role === role;
            },
        }),
        {
            name: 'auth-storage', // nombre para el localStorage
        },
    ),
);
