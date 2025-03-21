import { useAuthStore } from '../../store/authStore';

export const DashboardPage = () => {
    const { user, logout } = useAuthStore();

    return (
        <div className="container mt-5">
            <h1>Dashboard</h1>

            <p>Bienvenido, {user?.role}!</p>

            <button
                onClick={logout}
                className="btn btn-danger"
            >
                Logout
            </button>
        </div>
    );
};
