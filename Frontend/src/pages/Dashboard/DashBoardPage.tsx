import { useAuthStore } from '../../store/authStore';
import { logout } from '../../api/authService';
import '../../styles/auth.css';

export const DashboardPage = () => {
    const { user, fullName, logoutStore } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            logoutStore();
        } catch (error) {
            console.error('Logout failed...!', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h1 className="login-title mb-4">
                    Dashboard
                </h1>
                <div className="welcome-text">
                    👋 Bienvenido,{' '}
                    <strong>{fullName} !</strong>
                    <span className="text-muted">
                        Rol: {user?.role}
                    </span>
                </div>
                <button
                    onClick={handleLogout}
                    className="btn btn-logout"
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};
