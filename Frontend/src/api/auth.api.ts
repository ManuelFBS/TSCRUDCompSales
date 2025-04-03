import axios from '../utils/axios.config';
import { User } from '../store/types';

interface LoginResponse {
    token: string;
    user: User;
    fullName: string;
}

export const authApi = {
    login: async (user: string, password: string) => {
        const response = await axios.post<LoginResponse>('/auth/login', {
            user,
            password,
        });

        return response.data;
    },

    logout: async () => {
        return await axios.post('auth/logout');
    },
};
