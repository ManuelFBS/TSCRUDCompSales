import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({
    children,
}: ProtectedRouteProps) => {
    const { token } = useAuthStore();
    const location = useLocation();

    if (!token) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
