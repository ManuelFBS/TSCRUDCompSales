import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const EmployeeMenu = () => {
    const navigate = useNavigate();

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header className="bg-primary text-white">
                    <h4>Menú de Empleados</h4>
                </Card.Header>

                <Card.Body>
                    <Row className="g-4">
                        <Col md={6} lg={4}>
                            <Card.Title>Ingresar Nuevo</Card.Title>
                            <Card.Text>
                                Registrar un nuevo empleado en el sistema..,
                            </Card.Text>
                            <Button
                                variant="primary"
                                onClick={() =>
                                    navigate('/dashboard/employees/create')
                                }
                                className="mt-auto"
                            >
                                Nuevo Empleado
                            </Button>
                        </Col>

                        <Col md={6} lg={4}>
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Mostrar Todos</Card.Title>
                                    <Card.Text>
                                        Ver listado completo de empleados
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            navigate(
                                                '/dashboard/employees/list',
                                            )
                                        }
                                        className="mt-auto"
                                    >
                                        Listar Empleados
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={4}>
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Buscar Empleado</Card.Title>
                                    <Card.Text>
                                        Buscar empleado por número de DNI
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            navigate(
                                                '/dashboard/employees/search',
                                            )
                                        }
                                        className="mt-auto"
                                    >
                                        Buscar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={4}>
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Actualizar Empleado</Card.Title>
                                    <Card.Text>
                                        Actualizar datos de un empleado
                                        existente
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            navigate(
                                                '/dashboard/employees/update',
                                            )
                                        }
                                        className="mt-auto"
                                    >
                                        Actualizar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={4}>
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>
                                        Desincorporar Empleado
                                    </Card.Title>
                                    <Card.Text>
                                        Eliminar un empleado del sistema
                                    </Card.Text>
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            navigate(
                                                '/dashboard/employees/delete',
                                            )
                                        }
                                        className="mt-auto"
                                    >
                                        Desincorporar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EmployeeMenu;
