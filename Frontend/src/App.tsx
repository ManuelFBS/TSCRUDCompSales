import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { LoginPage, DashboardPage } from './pages';
import { ProtectedRoute } from './components/security/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
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
