import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import UserTable from '../components/tables/UserTable';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import { User } from '../types/user.types';
import { fetchUsers, deleteUser } from '../services/userService';

const UsersPage: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchUsers();
            setUsers(data);
        } catch (err) {
            setError(
                'Error al cargar los usuarios. Por favor, intente nuevamente.',
            );
            console.error('Error loading users:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreateClick = () => {
        navigate('create');
    };

    const handleEditClick = (user: User) => {
        navigate(`edit/${user.dni}`);
    };

    const handleDeleteClick = (userId: string) => {
        setUserToDelete(userId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;

        try {
            setIsLoading(true);
            await deleteUser(userToDelete);
            await loadUsers(); // Recargar la lista
            setShowDeleteModal(false);
        } catch (err) {
            setError(
                'Error al eliminar el usuario. Por favor, intente nuevamente.',
            );
            console.error('Error deleting user:', err);
        } finally {
            setIsLoading(false);
            setUserToDelete(null);
        }
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Usuarios</h1>
                        <Button
                            variant="primary"
                            onClick={handleCreateClick}
                            disabled={isLoading}
                        >
                            <FaPlus className="me-2" />
                            Nuevo Usuario
                        </Button>
                    </div>
                </Col>
            </Row>

            {error && (
                <Row className="mb-4">
                    <Col>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                </Row>
            )}

            <Row>
                <Col>
                    <UserTable
                        users={users}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        isLoading={isLoading}
                    />
                </Col>
            </Row>

            <DeleteConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                isLoading={isLoading}
                title="Eliminar Usuario"
                message="¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer."
            />
        </Container>
    );
};

export default UsersPage;
