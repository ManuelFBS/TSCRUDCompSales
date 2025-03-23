import { create } from 'zustand';

interface AuthState {
    token: string | null;
    user: { id: number; dni: string; role: string } | null;
    fullName: string | null;
    login: (
        token: string,
        user: { id: number; dni: string; role: string },
        fullName: string,
    ) => void;
    logoutStore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    fullName: null,
    login: (token, user, fullName) =>
        set({ token, user, fullName }),
    logoutStore: () =>
        set({ token: null, user: null, fullName: null }),
}));
