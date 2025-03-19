import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const apliClient = axios.create({
    baseURL: 'http://localhost:3001/api',
});

// ~ Interceptor para agregar el token a las solicitudes...
apliClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default apliClient;
