import axios from '../utils/axios.config';
import { User, UserFormData, UserWithEmployee } from '../types/user.types';

export const userApi = {
    // Obtener todos los usuarios
    getAll: async (): Promise<User[]> => {
        const response = await axios.get('/users');
        return response.data;
    },

    // Obtener un usuario por ID o nombre de usuario
    getByIdOrUser: async (idOrUser: string): Promise<UserWithEmployee> => {
        const response = await axios.get(`/users/user/search/${idOrUser}`);
        return response.data;
    },

    // Crear un nuevo usuario
    create: async (userData: UserFormData): Promise<User> => {
        const response = await axios.post('/users/user/new', userData);
        return response.data;
    },

    // Actualizar un usuario
    update: async (
        id: string,
        userData: Partial<UserFormData>,
    ): Promise<User> => {
        const response = await axios.patch(`/users/user/edit/${id}`, userData);
        return response.data;
    },

    // Eliminar un usuario
    delete: async (idOrUser: string): Promise<void> => {
        await axios.delete(`/users/user/delete/${idOrUser}`);
    },
};
