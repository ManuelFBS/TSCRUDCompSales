import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import EmployeeTable from '../components/tables/EmployeeTable';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import { Employee } from '../types/employee.types';
import { fetchEmployees, deleteEmployee } from '../services/employeeService';

const EmployeesPage: React.FC = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(
        null,
    );

    const loadEmployees = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchEmployees();
            setEmployees(data);
        } catch (err) {
            setError(
                'Error al cargar los empleados. Por favor, intente nuevamente.',
            );
            console.error('Error loading employees:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleCreateClick = () => {
        navigate('create');
    };

    const handleEditClick = (employee: Employee) => {
        navigate(`edit/${employee.dni}`);
    };

    const handleDeleteClick = (employeeId: string) => {
        setEmployeeToDelete(employeeId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!employeeToDelete) return;

        try {
            setIsLoading(true);
            await deleteEmployee(employeeToDelete);
            await loadEmployees(); // Recargar la lista
            setShowDeleteModal(false);
        } catch (err) {
            setError(
                'Error al eliminar el empleado. Por favor, intente nuevamente.',
            );
            console.error('Error deleting employee:', err);
        } finally {
            setIsLoading(false);
            setEmployeeToDelete(null);
        }
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Empleados</h1>
                        <Button
                            variant="primary"
                            onClick={handleCreateClick}
                            disabled={isLoading}
                        >
                            <FaPlus className="me-2" />
                            Nuevo Empleado
                        </Button>
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
                    <EmployeeTable
                        employees={employees}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        isLoading={isLoading}
                    />
                </Col>
            </Row>

            <DeleteConfirmModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                isLoading={isLoading}
                title="Eliminar Empleado"
                message="¿Está seguro que desea eliminar este empleado? Esta acción no se puede deshacer."
            />
        </Container>
    );
};

export default EmployeesPage;
