import { useAuthStore } from '../../store/authStore';
import { logout } from '../../api/authService';

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
        <>
            <div className="background-watermark"></div>
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <div className="card shadow-lg">
                    <div className="card-body text-center p-4">
                        <h1 className="mb-4">Dashboard</h1>
                        <div className="mb-4">
                            <p className="mb-2">
                                👋 Bienvenido,{' '}
                                <strong>{fullName}!</strong>
                            </p>
                            <p className="mb-4">
                                Rol:{' '}
                                <span className="badge bg-primary">
                                    {user?.role}
                                </span>
                            </p>
                        </div>
                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
