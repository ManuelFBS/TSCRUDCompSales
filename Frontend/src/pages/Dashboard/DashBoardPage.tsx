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
        <div className="container mt-5">
            <h1>Dashboard</h1>

            <p>
                Bienvenido, {fullName} ({user?.role})!
            </p>

            <button
                onClick={handleLogout}
                className="btn btn-danger"
            >
                Logout
            </button>
        </div>
    );
};
