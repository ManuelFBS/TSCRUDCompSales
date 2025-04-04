export interface User {
    id?: number;
    dni: string;
    user: string;
    role: 'Owner' | 'Admin' | 'Employee';
    status: 'Activo' | 'Bloqueado';
}

export interface UserWithEmployee extends User {
    employee?: {
        name: string;
        lastName: string;
        email: string;
        phone: string;
    };
}

export interface UserFormData {
    dni: string;
    user: string;
    password: string;
    role: 'Owner' | 'Admin' | 'Employee';
    status: 'Activo' | 'Bloqueado';
}
