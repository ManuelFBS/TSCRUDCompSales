// import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuthStore } from '../../store/authStore';

const Dashboard = () => {
    const navigate = useNavigate();
    const { hasRole } = useAuthStore();

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <h2>Dashboard</h2>
                </Col>
            </Row>

            <Row className="g-4">
                {(hasRole('Owner') || hasRole('Admin')) && (
                    <>
                        <Col md={6} lg={4}>
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Empleados</Card.Title>
                                    <Card.Text>
                                        Gestión de empleados de la empresa
                                    </Card.Text>
                                    <div className="mt-auto d-grid gap-2">
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                navigate('/dashboard/employees')
                                            }
                                        >
                                            Administrar Empleados
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={4}>
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Usuarios</Card.Title>
                                    <Card.Text>
                                        Gestión de usuarios del sistema
                                    </Card.Text>
                                    <div className="mt-auto d-grid gap-2">
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                navigate('/dashboard/users')
                                            }
                                        >
                                            Administrar Usuarios
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </>
                )}

                <Col md={6} lg={4}>
                    <Card className="h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>Ventas</Card.Title>
                            <Card.Text>
                                Módulo de ventas (próximamente)
                            </Card.Text>
                            <div className="mt-auto d-grid gap-2">
                                <Button variant="secondary" disabled>
                                    Próximamente
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Outlet />
        </Container>
    );
};

export default Dashboard;
