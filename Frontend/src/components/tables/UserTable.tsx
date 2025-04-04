import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { User } from '../../types/user.types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
    isLoading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    onEdit,
    onDelete,
    isLoading,
}) => {
    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case 'Admin':
                return 'danger';
            case 'Owner':
                return 'warning';
            default:
                return 'info';
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        return status === 'Activo' ? 'success' : 'danger';
    };

    return (
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>DNI</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.dni}>
                        <td>{user.dni}</td>
                        <td>{user.user}</td>
                        <td>
                            <Badge bg={getRoleBadgeVariant(user.role)}>
                                {user.role}
                            </Badge>
                        </td>
                        <td>
                            <Badge bg={getStatusBadgeVariant(user.status)}>
                                {user.status}
                            </Badge>
                        </td>
                        <td>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => onEdit(user)}
                                    disabled={isLoading}
                                >
                                    <FaEdit /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(user.dni)}
                                    disabled={isLoading}
                                >
                                    <FaTrash /> Eliminar
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
                {users.length === 0 && (
                    <tr>
                        <td colSpan={5} className="text-center">
                            No hay usuarios registrados
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default UserTable;
