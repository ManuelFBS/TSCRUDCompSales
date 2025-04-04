import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DasboardPage';
import EmployeesPage from './pages/employees/EmployeesPage';
import UsersPage from './pages/users/UsersPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import EmployeeCreatePage from './pages/employees/EmployeeCreatePage';
import EmployeeEditPage from './pages/employees/EmployeeEditPage';
import UserCreatePage from './pages/users/UserCreatePage';
import UserEditPage from './pages/users/UserEditPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <LandingPage />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <LoginPage />
                        )
                    }
                />

                {/* Rutas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                >
                    {/* Rutas de empleados */}
                    <Route path="employees" element={<EmployeesPage />} />
                    <Route
                        path="employees/create"
                        element={<EmployeeCreatePage />}
                    />
                    <Route
                        path="employees/edit/:id"
                        element={<EmployeeEditPage />}
                    />

                    {/* Rutas de usuarios */}
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/create" element={<UserCreatePage />} />
                    <Route path="users/edit/:id" element={<UserEditPage />} />

                    {/* Ruta por defecto del dashboard */}
                    <Route
                        index
                        element={<Navigate to="employees" replace />}
                    />
                </Route>

                {/* Ruta 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
