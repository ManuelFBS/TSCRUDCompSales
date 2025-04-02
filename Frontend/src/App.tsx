import { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Outlet />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default App;
