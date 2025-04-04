export interface Employee {
    id?: number;
    dni: string;
    name: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
    country: string;
}

export interface EmployeeStatus {
    id?: number;
    dni: string;
    statusWork: string;
}

export interface Department {
    id?: number;
    dni: string;
    department: string;
    position: string;
}

export interface EmployeeWithDetails extends Employee {
    status?: EmployeeStatus;
    department?: Department;
}

export interface EmployeeFormData {
    dni: string;
    name: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
    country: string;
    department: string;
    position: string;
}
