import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // >Ajusta según tu puerto del backend...
    withCredentials: true, // >Importante para CSRF y cookies...
});

// ~Interceptor para añadir el token JWT a las solicitudes...
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ~Interceptor para añadir el token CSRF...
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // *Añadir token CSRF para métodos que no sean GET...
    if (config.method !== 'get') {
        const csrfToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        if (csrfToken) {
            config.headers['X-CSRF-TOKEN'] = csrfToken;
        }
    }

    return config;
});

// ~Interceptor para manejar errores...
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // *Token expirado o no válido...
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

export default api;
