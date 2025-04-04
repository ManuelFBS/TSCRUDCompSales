import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { authApi } from '../../api/auth.api';
import {
    FaUsers,
    FaUserTie,
    FaShoppingCart,
    FaUserFriends,
    FaBoxOpen,
    FaTruck,
    FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();

    const handleLogout = async () => {
        try {
            await authApi.logout();
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Remsys 1.0</h3>
                <p>{user?.fullName}</p>
            </div>

            <Nav className="flex-column">
                <div className="nav-section">
                    <Nav.Link onClick={() => navigate('/dashboard/employees')}>
                        <FaUserTie /> <span>Empleados</span>
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate('/dashboard/users')}>
                        <FaUsers /> <span>Usuarios</span>
                    </Nav.Link>
                </div>

                <div className="nav-divider" />

                <div className="nav-section">
                    <Nav.Link onClick={() => navigate('/dashboard/sales')}>
                        <FaShoppingCart /> <span>Ventas</span>
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate('/dashboard/customers')}>
                        <FaUserFriends /> <span>Clientes</span>
                    </Nav.Link>
                </div>

                <div className="nav-divider" />

                <div className="nav-section">
                    <Nav.Link onClick={() => navigate('/dashboard/purchases')}>
                        <FaBoxOpen /> <span>Adquisiciones</span>
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate('/dashboard/suppliers')}>
                        <FaTruck /> <span>Proveedores</span>
                    </Nav.Link>
                </div>

                <div className="nav-divider" />

                <Nav.Link className="logout-link" onClick={handleLogout}>
                    <FaSignOutAlt /> <span>Cerrar Sesión</span>
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
