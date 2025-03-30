import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import {
    LandingPage,
    BackgroundPage,
    LoginPage,
    DashboardPage,
} from './pages';
import { ProtectedRoute } from './components/security/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import { AuthenticateLayout } from './layouts/AuthenticateLayout';

function App() {
    const { token } = useAuthStore();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        // token ? (
                        //     <Navigate
                        //         to="/dashboard"
                        //         replace
                        //     />
                        // ) : (
                        //     <LandingPage />
                        // )
                        token ? (
                            <Navigate
                                to="/background"
                                replace
                            />
                        ) : (
                            <LandingPage />
                        )
                    }
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route element={<AuthenticateLayout />}>
                    <Route
                        // path="/dashboard"
                        // element={
                        //     <ProtectedRoute>
                        //         <DashboardPage />
                        //     </ProtectedRoute>
                        // }
                        path="/background"
                        element={
                            <ProtectedRoute>
                                <BackgroundPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route
                    path="*"
                    element={<h1>Not Found...!</h1>}
                />
            </Routes>
        </Router>
    );
}

export default App;
