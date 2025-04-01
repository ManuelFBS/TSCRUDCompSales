import React, { useState } from 'react';
import {
    Form,
    Button,
    Container,
    Card,
    Alert,
} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const from =
        location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault;

        try {
            await login(username, password);
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <Container className="login-container">
            <Card className="login-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        Iniciar Sesión
                    </Card.Title>
                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group
                            className="mb-3"
                            controlId="username"
                        >
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su usuario"
                                value={username}
                                onChange={(e) =>
                                    setUsername(
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="password"
                        >
                            <Form.Label>
                                Contraseña
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </Form.Group>
                        ;
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? 'Iniciando sesión...'
                                : 'Iniciar Sesión'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;
