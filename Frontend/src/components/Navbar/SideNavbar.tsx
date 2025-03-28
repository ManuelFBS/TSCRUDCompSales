import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const SideNavbar = () => {
    const navigate = useNavigate();
    const { logoutStore } = useAuthStore();

    const handleLogout = () => {
        logoutStore();
        navigate('/login');
    };

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white"
            style={{
                width: '250px',
                minHeight: '100vh',
                background:
                    'linear-gradient(135deg, #1976D2, #64B5F6)',
            }}
        >
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">MTM-App 1.0</span>
            </div>
            <hr />
            <Nav className="fles-column">
                <Nav.Link
                    className="text-white mb-2"
                    onClick={() => navigate('/dashboard')}
                >
                    <i className="bi bi-speedometer2 me-2"></i>
                    Dashboard
                </Nav.Link>
                <Nav.Link
                    className="text-white mb-2"
                    onClick={() => navigate('/employees')}
                >
                    <i className="bi bi-people-fill me-2"></i>
                    Empleados
                </Nav.Link>
                <Nav.Link
                    className="text-white mb-2"
                    onClick={() => navigate('/inventory')}
                >
                    <i className="bi bi-box-seam-fill me-2"></i>
                    Inventario
                </Nav.Link>
                <Nav.Link
                    className="text-white mb-2"
                    onClick={() => navigate('/others')}
                >
                    <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                    Otros
                </Nav.Link>
            </Nav>
            <hr />
            <div className="dropdown">
                <Nav.Link
                    className="text-white"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-left me-2"></i>
                    Salir
                </Nav.Link>
            </div>
        </div>
    );
};
