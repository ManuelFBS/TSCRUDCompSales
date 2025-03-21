import apiClient from './apiClient';

interface LoginData {
    user: string;
    password: string;
}

// interface LoginResponse {
//     token: string;
// }

// ~ Login...
export const login = async (
    data: LoginData,
): Promise<{
    token: string;
    user: { id: number; dni: string; role: string };
}> => {
    const response = await apiClient.post<{
        token: string;
        user: { id: number; dni: string; role: string };
    }>('/auth/login', data);

    return response.data;
};

// ~ Logout...
export const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
};
