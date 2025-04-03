export interface User {
    id: number;
    dni: string;
    role: string;
    fullName?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}
