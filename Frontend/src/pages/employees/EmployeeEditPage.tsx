import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../../components/forms/EmployeeForm';
import {
    EmployeeFormData,
    EmployeeWithDetails,
} from '../../types/employee.types';
import { employeeApi } from '../../api/employee.api';
import { FaArrowLeft } from 'react-icons/fa';

const EmployeeEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<EmployeeWithDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            if (!id) return;

            try {
                setIsLoading(true);
                setError(null);
                const data = await employeeApi.getByIdOrDni(id);
                setEmployee(data);
            } catch (err) {
                setError(
                    'Error al cargar los datos del empleado. Por favor, intente nuevamente.',
                );
                console.error('Error fetching employee:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleSubmit = async (data: EmployeeFormData) => {
        if (!id) return;

        try {
            setIsSaving(true);
            setError(null);
            await employeeApi.update(id, data);
            navigate('/dashboard/employees');
        } catch (err) {
            setError(
                'Error al actualizar el empleado. Por favor, intente nuevamente.',
            );
            console.error('Error updating employee:', err);
        } finally {
            setIsSaving(false);
        }
    };

    // Convertir el objeto employee a un objeto compatible con EmployeeFormData
    const mapEmployeeToFormData = (
        employee: EmployeeWithDetails,
    ): EmployeeFormData => {
        return {
            dni: employee.dni,
            name: employee.name,
            lastName: employee.lastName,
            birthDate: employee.birthDate,
            email: employee.email,
            phone: employee.phone,
            country: employee.country,
            department: employee.department?.department || '',
            position: employee.department?.position || '',
        };
    };

    if (isLoading) {
        return (
            <Container className="py-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2">Cargando datos del empleado...</p>
                </div>
            </Container>
        );
    }

    if (!employee && !isLoading) {
        return (
            <Container className="py-4">
                <Alert variant="danger">
                    No se pudo encontrar el empleado solicitado. Por favor,
                    verifica el ID e intenta nuevamente.
                </Alert>
                <Button
                    variant="primary"
                    onClick={() => navigate('/dashboard/employees')}
                >
                    Volver a la lista de empleados
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
                            onClick={() => navigate('/dashboard/employees')}
                        >
                            <FaArrowLeft />
                        </Button>
                        <h1>Editar Empleado</h1>
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

            {employee && (
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <EmployeeForm
                                    initialData={mapEmployeeToFormData(
                                        employee,
                                    )}
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

export default EmployeeEditPage;
