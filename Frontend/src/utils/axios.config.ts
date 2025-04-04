import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // > Muy importante para las cookies CSRF...
    headers: {
        'Content-Type': 'application/json',
    },
});

// ~Interceptor para manejar el token CSRF...
axiosInstance.interceptors.request.use((config) => {
    // *Obtener el token CSRF de las cookies
    const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN'))
        ?.split('=')[1];

    if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken;
    }

    return config;
});

// ~Interceptor para manejar el token JWT...
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;
