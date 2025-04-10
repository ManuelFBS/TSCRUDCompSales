export interface Employee {
    id?: number;
    dni: string;
    name: string;
    lastName: string;
    birthDate: string | Date;
    email: string;
    phone: string;
    country: string;
    department?: string; // >A partir de aquí, estos campos vendrán de las relaciones...
    position?: string;
    statusWork?: string;
}

export interface Department {
    id?: number;
    dni: string;
    department: string;
    position: string;
}

export interface EmployeeStatus {
    id?: number;
    dni: string;
    statusWork: string;
}

export interface EmployeeWithDetails extends Employee {
    department: string;
    position: string;
    statusWork: string;
}
