import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

// ~Interceptor para añadir el token JWT a las solicitudes...
apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ~Interceptor para manejar errores...
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    },
);

export const loginUser = async (
    username: string,
    password: string,
) => {
    const response = await apiClient.post('/auth/login', {
        user: username,
        password,
    });
    return response.data;
};

export const logoutUser = async (token: string) => {
    await apiClient.post('/auth/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export default apiClient;
