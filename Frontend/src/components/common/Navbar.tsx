import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
    FaUsers,
    FaUserTie,
    FaShoppingCart,
    FaUserFriends,
    FaBoxOpen,
    FaTruck,
    FaSignOutAlt,
} from 'react-icons/fa';
import { authApi } from '../../api/auth.api';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

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
                {/* Gestión de Personal */}
                <div className="nav-section">
                    <Nav.Link onClick={() => navigate('/employees')}>
                        <FaUserTie /> Empleados
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate('/users')}>
                        <FaUsers /> Usuarios
                    </Nav.Link>
                </div>

                <div className="nav-divider" />

                {/* Gestión de Ventas */}
                <div className="nav-section">
                    <Nav.Link onClick={() => navigate('/sales')}>
                        <FaShoppingCart /> Ventas
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate('/customers')}>
                        <FaUserFriends /> Clientes
                    </Nav.Link>
                </div>

                <div className="nav-divider" />

                {/* Gestión de Compras */}
                <div className="nav-section">
                    <Nav.Link onClick={() => navigate('/purchases')}>
                        <FaBoxOpen /> Adquisiciones
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate('/suppliers')}>
                        <FaTruck /> Proveedores
                    </Nav.Link>
                </div>
            </Nav>

            <div className="nav-divider" />

            {/* Cerrar Sesión */}
            <Nav.Link onClick={handleLogout} className="logout-link">
                <FaSignOutAlt /> Cerrar Sesión
            </Nav.Link>
        </div>
    );
};

export default Sidebar;
