import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
// ?import { Nav, Navbar as BSNavbar, Button, Offcanvas } from 'react-bootstrap';
import { Nav, Navbar as BSNavbar, Offcanvas } from 'react-bootstrap';
import {
    FaUser,
    FaUsers,
    // ?FaBoxes,
    FaSignOutAlt,
    FaHome,
    FaShoppingCart,
    FaTruck,
} from 'react-icons/fa';
import styles from './styles.module.css';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    // ?const { logout, user, hasRole } = useAuthStore();
    const { logout, hasRole } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // *Forzar logout aunque falle la llamada al backend
            navigate('/login');
        }
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        setShow(false);
    };

    return (
        <>
            <BSNavbar expand="lg" className={`${styles.navbar} flex-lg-column`}>
                <BSNavbar.Brand className="d-flex justify-content-center py-3">
                    <div
                        className={styles.logo}
                        onClick={() => handleNavigate('/dashboard')}
                    >
                        Remsys
                    </div>
                </BSNavbar.Brand>

                <BSNavbar.Toggle
                    aria-controls="offcanvasNavbar"
                    onClick={() => setShow(true)}
                    className={styles.navbarToggle}
                />

                <BSNavbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                    show={show}
                    onHide={() => setShow(false)}
                    className={styles.offcanvas}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title
                            id="offcanvasNavbarLabel"
                            className={styles.offcanvasTittle}
                        >
                            Menú
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column w-100">
                            {(hasRole('Owner') || hasRole('Admin')) && (
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={() =>
                                            handleNavigate('/dashboard')
                                        }
                                        className={styles.menuItem}
                                    >
                                        <FaHome
                                            className={`${styles.menuIcon} me-2`}
                                        />{' '}
                                        Dashboard
                                    </Nav.Link>
                                </Nav.Item>
                            )}

                            <Nav.Item>
                                <Nav.Link
                                    onClick={() =>
                                        handleNavigate('/dashboard/employees')
                                    }
                                    className={styles.menuItem}
                                >
                                    <FaUsers
                                        className={`${styles.menuIcon} me-2`}
                                    />{' '}
                                    Empleados
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link
                                    onClick={() =>
                                        handleNavigate('/dashboard/users')
                                    }
                                    className={styles.menuItem}
                                >
                                    <FaUser
                                        className={`${styles.menuIcon} me-2`}
                                    />{' '}
                                    Usuarios
                                </Nav.Link>
                            </Nav.Item>

                            <hr />

                            <Nav.Item>
                                <Nav.Link disabled>
                                    <FaShoppingCart
                                        className={`${styles.menuIcon} me-2`}
                                    />{' '}
                                    Ventas
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link disabled>
                                    <FaTruck className="me-2" /> Proveedores
                                </Nav.Link>
                            </Nav.Item>

                            <hr />

                            <Nav.Item>
                                <Nav.Link
                                    onClick={handleLogout}
                                    className={styles.menuCloseSession}
                                >
                                    <FaSignOutAlt
                                        className={`${styles.menuCloseSessionIcon} me-2`}
                                    />{' '}
                                    Cerrar Sesión
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Offcanvas.Body>
                </BSNavbar.Offcanvas>
            </BSNavbar>
        </>
    );
};

export default Navbar;
