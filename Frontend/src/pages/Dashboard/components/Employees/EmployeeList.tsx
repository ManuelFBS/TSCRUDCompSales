import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Container, Button, Spinner, Alert } from 'react-bootstrap';
import { useEmployeeStore } from '../../../../store/employeeStore';

const EmployeeList = () => {
    const { employees, loading, error, fetchEmployees } = useEmployeeStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleViewDetails = (dni: string) => {
        navigate(`/dashboard/employees/list/${dni}`);
    };

    if (loading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );

    if (error)
        return (
            <Alert variant="danger" className="mt-3">
                Error al cargar empleados: {error}
            </Alert>
        );

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Listado de Empleados</h3>
                <Button
                    variant="secondary"
                    onClick={() => navigate('/dashboard/employees')}
                >
                    Volver al Menú
                </Button>
            </div>

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
                    {employees.length > 0 ? (
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
                                        onClick={() =>
                                            handleViewDetails(employee.dni)
                                        }
                                    >
                                        Ver Detalles
                                    </Button>
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
        </Container>
    );
};

export default EmployeeList;
