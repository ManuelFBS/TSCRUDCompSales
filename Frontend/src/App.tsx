import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import LoginPage from './pages/Login/LoginPage';
// import Dashboard from './pages/Dashboard/Dashboard';
import EmployeeMenu from './pages/Dashboard/components/Employees/EmployeeMenu';
import EmployeeList from './pages/Dashboard/components/Employees/EmployeeList';
// import EmployeeDetails from './pages/Dashboard/components/Employees/EmployeeDetails';
// import CreateEmployee from './pages/Dashboard/components/Employees/CreateEmployee';
// import SearchEmployee from './pages/Dashboard/components/Employees/SearchEmployee';
// import UpdateEmployee from './pages/Dashboard/components/Employees/UpdateEmployee';
// import DeleteEmployee from './pages/Dashboard/components/Employees/DeleteEmployee';
import MainLayout from './layouts/MainLayout';
import { useAuthStore } from './store/authStore';
import { JSX } from 'react/jsx-runtime';
// import EmployeesPage from './pages/Dashboard/components/Employees/EmployeesPage';
// import UsersPage from './pages/Dashboard/components/Users/UsersPage';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuthStore();
    return !isAuthenticated() ? children : <Navigate to="/dashboard" />;
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <LandingPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <MainLayout />
                        </PrivateRoute>
                    }
                >
                    {/* <Route index element={<Dashboard />} /> */}
                    {/* <Route path="employees" element={<EmployeesPage />} />
                    <Route path="users" element={<UsersPage />} /> */}
                    <Route index element={<EmployeeMenu />} />
                    <Route path="employees/list" element={<EmployeeList />} />
                    {/* <Route path="list/:dni" element={<EmployeeDetails />} />
                    <Route path="create" element={<CreateEmployee />} />
                    <Route path="search" element={<SearchEmployee />} />
                    <Route path="update" element={<UpdateEmployee />} />
                    <Route path="delete" element={<DeleteEmployee />} /> */}
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
