import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { UserFormData } from '../../types/user.types';

interface UserFormProps {
    initialData?: Partial<UserFormData>;
    onSubmit: (data: UserFormData) => void;
    isLoading: boolean;
    isEdit?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
    initialData,
    onSubmit,
    isLoading,
    isEdit = false,
}) => {
    const [formData, setFormData] = useState<UserFormData>({
        dni: '',
        user: '',
        password: '',
        role: 'Employee',
        status: 'Activo',
        ...initialData,
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                            type="text"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                            disabled={!!initialData?.dni}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            required
                            disabled={isEdit}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!isEdit}
                            placeholder={
                                isEdit
                                    ? 'Dejar en blanco para mantener la actual'
                                    : ''
                            }
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="Employee">Empleado</option>
                            <option value="Admin">Administrador</option>
                            <option value="Owner">Propietario</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="Activo">Activo</option>
                    <option value="Bloqueado">Bloqueado</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </Form>
    );
};

export default UserForm;
