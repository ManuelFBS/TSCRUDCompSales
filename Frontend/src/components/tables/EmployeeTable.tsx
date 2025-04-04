import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Employee } from '../../types/employee.types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface EmployeeWithDepartment extends Employee {
    department?: {
        department: string;
        position: string;
    };
}

interface EmployeeTableProps {
    employees: EmployeeWithDepartment[];
    onEdit: (employee: EmployeeWithDepartment) => void;
    onDelete: (employeeId: string) => void;
    isLoading: boolean;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
    employees,
    onEdit,
    onDelete,
    isLoading,
}) => {
    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>DNI</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>País</th>
                    <th>Departamento</th>
                    <th>Posición</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee.dni}>
                        <td>{employee.dni}</td>
                        <td>{employee.name}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.country}</td>
                        <td>
                            {employee.department?.department || 'No asignado'}
                        </td>
                        <td>
                            {employee.department?.position || 'No asignado'}
                        </td>
                        <td>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => onEdit(employee)}
                                    disabled={isLoading}
                                >
                                    <FaEdit /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(employee.dni)}
                                    disabled={isLoading}
                                >
                                    <FaTrash /> Eliminar
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
                {employees.length === 0 && (
                    <tr>
                        <td colSpan={9} className="text-center">
                            No hay empleados registrados
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default EmployeeTable;
