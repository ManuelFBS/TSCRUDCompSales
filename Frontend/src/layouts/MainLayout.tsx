import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar/Navbar';
import './MainLayout.css';

const MainLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="main-layout">
            <Navbar />
            <Container fluid className="main-content">
                {children}
            </Container>
        </div>
    );
};

export default MainLayout;
