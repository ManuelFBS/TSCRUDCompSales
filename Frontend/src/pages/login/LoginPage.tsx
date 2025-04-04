import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth.api';
import { useAuthStore } from '../../store/authStore';
import logo from '../../assets/images/logo.png';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState({
        user: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authApi.login(
                formData.user,
                formData.password,
            );
            login(response.token, {
                ...response.user,
                fullName: response.fullName,
            });
            navigate('/dashboard');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'Error al iniciar sesión');
            } else if (
                typeof err === 'object' &&
                err !== null &&
                'response' in err
            ) {
                const axiosError = err as {
                    response?: { data?: { error?: string } };
                };
                setError(
                    axiosError.response?.data?.error ||
                        'Error al iniciar sesión',
                );
            } else {
                setError('Error al iniciar sesión');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container fluid className="login-page">
            <Card className="login-card">
                <Card.Body>
                    <div className="text-center mb-4">
                        <img src={logo} alt="Logo" className="login-logo" />
                        <h2>Iniciar Sesión</h2>
                    </div>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="user"
                                value={formData.user}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;
