import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/forms/UserForm';
import { UserFormData } from '../../types/user.types';
import { userApi } from '../../api/user.api';
import { FaArrowLeft } from 'react-icons/fa';

const UserCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: UserFormData) => {
        try {
            setIsLoading(true);
            setError(null);
            await userApi.create(data);
            navigate('/dashboard/users');
        } catch (err) {
            setError(
                'Error al crear el usuario. Por favor, intente nuevamente.',
            );
            console.error('Error creating user:', err);
        } finally {
            setIsLoading(false);
        }
    };

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
                        <h1>Crear Nuevo Usuario</h1>
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
                    <Card>
                        <Card.Body>
                            <UserForm
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserCreatePage;
