import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { loginUser, logoutUser } from '../api/apiClient';

interface AuthState {
    token: string | null;
    user: {
        id: number;
        dni: string;
        role: string;
    } | null;
    isLoading: boolean;
    error: string | null;
    login: (
        username: string,
        password: string,
    ) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isLoading: false,
            error: null,
            login: async (username, password) => {
                set({ isLoading: true, error: null });
                try {
                    const { token } = await loginUser(
                        username,
                        password,
                    );
                    const decoded = jwtDecode<{
                        id: number;
                        dni: string;
                        role: string;
                    }>(token);
                    set({
                        token,
                        user: {
                            id: decoded.id,
                            dni: decoded.dni,
                            role: decoded.role,
                        },
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : 'Login failed',
                        isLoading: false,
                    });
                    throw error;
                }
            },
            logout: async () => {
                set({ isLoading: true });
                try {
                    const token =
                        useAuthStore.getState().token;
                    if (token) {
                        await logoutUser(token);
                    }
                    set({
                        token: null,
                        user: null,
                        isLoading: false,
                    });
                } catch (error) {
                    set({ isLoading: false });
                    console.error('Logout error:', error);
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                token: state.token,
                user: state.user,
            }),
        },
    ),
);
