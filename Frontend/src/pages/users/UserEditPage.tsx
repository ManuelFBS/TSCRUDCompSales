import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../../components/forms/UserForm';
import { UserFormData, User } from '../../types/user.types';
import { userApi } from '../../api/user.api';
import { FaArrowLeft } from 'react-icons/fa';

const UserEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;

            try {
                setIsLoading(true);
                setError(null);
                const data = await userApi.getByIdOrUser(id);
                setUser(data);
            } catch (err) {
                setError(
                    'Error al cargar los datos del usuario. Por favor, intente nuevamente.',
                );
                console.error('Error fetching user:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (data: UserFormData) => {
        if (!id) return;

        try {
            setIsSaving(true);
            setError(null);
            await userApi.update(id, data);
            navigate('/dashboard/users');
        } catch (err) {
            setError(
                'Error al actualizar el usuario. Por favor, intente nuevamente.',
            );
            console.error('Error updating user:', err);
        } finally {
            setIsSaving(false);
        }
    };

    // Convertir el objeto user a un objeto compatible con UserFormData
    const mapUserToFormData = (user: User): Partial<UserFormData> => {
        return {
            dni: user.dni,
            user: user.user,
            role: user.role,
            status: user.status,
        };
    };

    if (isLoading) {
        return (
            <Container className="py-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2">Cargando datos del usuario...</p>
                </div>
            </Container>
        );
    }

    if (!user && !isLoading) {
        return (
            <Container className="py-4">
                <Alert variant="danger">
                    No se pudo encontrar el usuario solicitado. Por favor,
                    verifica el ID e intenta nuevamente.
                </Alert>
                <Button
                    variant="primary"
                    onClick={() => navigate('/dashboard/users')}
                >
                    Volver a la lista de usuarios
                </Button>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex align-items-center">
                        <Button
                            variant="outline-secondary"
                            className="me-3"
                            onClick={() => navigate('/dashboard/users')}
                        >
                            <FaArrowLeft />
                        </Button>
                        <h1>Editar Usuario</h1>
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

            {user && (
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <UserForm
                                    initialData={mapUserToFormData(user)}
                                    onSubmit={handleSubmit}
                                    isLoading={isSaving}
                                    isEdit
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default UserEditPage;
