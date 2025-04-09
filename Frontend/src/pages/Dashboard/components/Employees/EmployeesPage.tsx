import React, { useState } from 'react';
import {
    Button,
    Table,
    Container,
    Row,
    Col,
    Form,
    Modal,
} from 'react-bootstrap';
import api from '../../../../api/api';
import { useAuthStore } from '../../../../store/authStore';

const EmployeesPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        lastName: '',
        birthDate: '',
        email: '',
        phone: '',
        country: '',
        department: '',
        position: '',
    });
    const { hasRole } = useAuthStore();

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await api.get('/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/employees/employee/new', formData);
            setShowModal(false);
            fetchEmployees();
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    };

    React.useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h3>Gestión de Empleados</h3>
                </Col>
                <Col className="text-end">
                    {hasRole('Owner') || hasRole('Admin') ? (
                        <Button
                            variant="primary"
                            onClick={() => setShowModal(true)}
                        >
                            Nuevo Empleado
                        </Button>
                    ) : null}
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center">
                                Cargando...
                            </td>
                        </tr>
                    ) : employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.dni}>
                                <td>{employee.dni}</td>
                                <td>{employee.name}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="me-2"
                                    >
                                        Ver
                                    </Button>
                                    {hasRole('Owner') && (
                                        <>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                Editar
                                            </Button>
                                            <Button variant="danger" size="sm">
                                                Eliminar
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">
                                No hay empleados registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Modal para nuevo empleado */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Empleado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>DNI</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dni"
                                        value={formData.dni}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha de Nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Departamento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cargo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end">
                            <Button
                                variant="secondary"
                                className="me-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default EmployeesPage;
