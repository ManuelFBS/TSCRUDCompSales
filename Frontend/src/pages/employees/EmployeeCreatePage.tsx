import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../../components/forms/EmployeeForm';
import { EmployeeFormData } from '../../types/employee.types';
import { employeeApi } from '../../api/employee.api';
import { FaArrowLeft } from 'react-icons/fa';

const EmployeeCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: EmployeeFormData) => {
        try {
            setIsLoading(true);
            setError(null);
            await employeeApi.create(data);
            navigate('/dashboard/employees');
        } catch (err) {
            setError(
                'Error al crear el empleado. Por favor, intente nuevamente.',
            );
            console.error('Error creating employee:', err);
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
                            onClick={() => navigate('/dashboard/employees')}
                        >
                            <FaArrowLeft />
                        </Button>
                        <h1>Crear Nuevo Empleado</h1>
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
                            <EmployeeForm
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

export default EmployeeCreatePage;
