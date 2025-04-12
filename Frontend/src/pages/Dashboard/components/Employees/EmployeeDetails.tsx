import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Card,
    Container,
    Button,
    Spinner,
    Alert,
    ListGroup,
    Row,
    Col,
} from 'react-bootstrap';
import { useEmployeeStore } from '../../../../store/employeeStore';
import { EmployeeWithDetails } from '../../../../types/employeeTypes';

const EmployeeDetails = () => {
    const { dni } = useParams<{ dni: string }>();
    const {
        currentEmployee,
        loading,
        error,
        fetchEmployeeByDni,
        resetCurrentEmployee,
    } = useEmployeeStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (dni) {
            fetchEmployeeByDni(dni);
        }

        return () => {
            resetCurrentEmployee();
        };
    }, [dni, fetchEmployeeByDni, resetCurrentEmployee]);

    if (loading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );

    if (error)
        return (
            <Alert variant="danger" className="mt-3">
                Error al cargar empleado: {error}
            </Alert>
        );

    if (!currentEmployee)
        return (
            <Alert variant="warning" className="mt-3">
                No se encontró el empleado solicitado
            </Alert>
        );

    // *Convertir currentEmployee al tipo EmployeeWithDetails...
    const employee = currentEmployee as EmployeeWithDetails;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Detalles del Empleado</h4>
                        <Button
                            variant="light"
                            onClick={() =>
                                navigate('/dashboard/employees/list')
                            }
                        >
                            Volver
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>DNI: </strong> {employee.dni}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Nombres: </strong> {employee.name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Apellidos: </strong>{' '}
                                    {employee.lastName}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Fecha de Nacimiento: </strong>{' '}
                                    {new Date(
                                        employee.birthDate,
                                    ).toLocaleDateString()}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Email: </strong> {employee.email}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Teléfono: </strong> {employee.phone}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>País: </strong> {employee.country}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Departamento: </strong>{' '}
                                    {employee.department}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Cargo: </strong> {employee.position}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Status: </strong>{' '}
                                    {employee.statusWork}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EmployeeDetails;
