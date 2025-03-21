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
            </Routes>

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
        </Router>
    );
}

export default App;
