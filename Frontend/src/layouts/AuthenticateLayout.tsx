import { Outlet } from 'react-router-dom';
import { SideNavbar } from '../components/Navbar/SideNavbar';

export const AuthenticateLayout = () => {
    return (
        <div className="d-flex">
            <SideNavbar />
            <div className="flex-grow-1 p-4">
                <Outlet />
            </div>
        </div>
    );
};
