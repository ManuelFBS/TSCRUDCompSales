import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DasboardPage';
import EmployeesPage from './pages/employees';
import ProtectedRoute from './components/common/ProtectedRoute';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                >
                    {/* Rutas anidadas para el dashboard */}
                    {/* <Route path="employees/*" element={<EmployeeRoutes />} />
                    <Route path="users/*" element={<UserRoutes />} /> */}
                    {/* Otras rutas se agregarán después */}
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
