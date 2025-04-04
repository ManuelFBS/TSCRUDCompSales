import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Navbar';
import { useAuthStore } from '../store/authStore';

const DashboardPage: React.FC = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="dashboard-content">
                <Container fluid>
                    <div className="welcome-section">
                        <h1>Bienvenido, {user?.fullName}</h1>
                        <p>Panel de Control - Remsys 1.0</p>
                    </div>
                    <Outlet />
                </Container>
            </main>
        </div>
    );
};

export default DashboardPage;
