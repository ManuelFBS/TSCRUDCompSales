import {
    Nav,
    Navbar as BsNavbar,
    Container,
    Button,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <BsNavbar expand="lg" className="navbar-custom">
            <Container fluid>
                <BsNavbar.Brand
                    as={Link}
                    to="/dashboard"
                    className="text-white"
                >
                    Sistema Empresa
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {(user?.role === 'Owner' ||
                            user?.role === 'Admin') && (
                            <Nav.Link
                                as={Link}
                                to="/dashboard"
                                className="text-white"
                            >
                                Dashboard
                            </Nav.Link>
                        )}
                        <Nav.Link className="text-white">
                            Ventas
                        </Nav.Link>
                        <Nav.Link className="text-white">
                            Inventario
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Button
                            variant="outline-light"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </Button>
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
