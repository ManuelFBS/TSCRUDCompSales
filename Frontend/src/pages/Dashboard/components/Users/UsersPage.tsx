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

const UsersPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        dni: '',
        user: '',
        password: '',
        role: 'Employee',
        status: 'Activo',
    });
    const { hasRole } = useAuthStore();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/users/user/new', formData);
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h3>Gestión de Usuarios</h3>
                </Col>
                <Col className="text-end">
                    {hasRole('Owner') || hasRole('Admin') ? (
                        <Button
                            variant="primary"
                            onClick={() => setShowModal(true)}
                        >
                            Nuevo Usuario
                        </Button>
                    ) : null}
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>DNI</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={4} className="text-center">
                                Cargando...
                            </td>
                        </tr>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.user}</td>
                                <td>{user.dni}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="me-2"
                                    >
                                        Ver
                                    </Button>
                                    {hasRole('Owner') || hasRole('Admin') ? (
                                        <>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                Editar
                                            </Button>
                                            <Button variant="danger" size="sm">
                                                {user.status === 'Activo'
                                                    ? 'Bloquear'
                                                    : 'Activar'}
                                            </Button>
                                        </>
                                    ) : null}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center">
                                No hay usuarios registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Modal para nuevo usuario */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => handleInputChange(e)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="user"
                                value={formData.user}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => handleInputChange(e)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => handleInputChange(e)}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Employee">
                                            Empleado
                                        </option>
                                        {hasRole('Owner') && (
                                            <option value="Admin">
                                                Administrador
                                            </option>
                                        )}
                                        {hasRole('Owner') && (
                                            <option value="Owner">Dueño</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Bloqueado">
                                            Bloqueado
                                        </option>
                                    </Form.Select>
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

export default UsersPage;
