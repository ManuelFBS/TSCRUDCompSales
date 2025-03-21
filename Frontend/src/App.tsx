import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { LoginPage, DashboardPage } from './pages';
import { ProtectedRoute } from './components/security/ProtectedRoute';
import { useAuthStore } from './store/authStore';

function App() {
    const { token } = useAuthStore();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        token ? (
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<h1>Not Found...!</h1>}
                />
            </Routes>
        </Router>
    );
}

export default App;
