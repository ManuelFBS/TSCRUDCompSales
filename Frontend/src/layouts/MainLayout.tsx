import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <Navbar />
            <div className="flex-grow-1 watermark-background">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
