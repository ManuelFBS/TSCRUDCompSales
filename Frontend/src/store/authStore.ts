import { create } from 'zustand';

interface AuthState {
    token: string | null;
    user: { id: number; dni: string; role: string } | null;
    login: (
        token: string,
        user: { id: number; dni: string; role: string },
    ) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    login: (token, user) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
}));
