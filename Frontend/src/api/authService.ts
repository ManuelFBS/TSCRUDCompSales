import apiClient from './apiClient';

interface LoginData {
    user: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: { id: number; dni: string; role: string };
    fullName: string;
}

// ~ Login...
export const login = async (
    data: LoginData,
): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
        '/auth/login',
        data,
    );

    return response.data;
};

// ~ Logout...
export const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
};
