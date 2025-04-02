import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Accordion,
} from 'react-bootstrap';
import EmployeeSection from './components/EmployeeSection';
import SupplierSection from './components/SupplierSection';
import UserSection from './components/UserSection';
import { useAuthStore } from '../../store/authStore';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuthStore();
    const [activeKey, setActiveKey] = useState<
        string | null
    >(null);

    return (
        <Container fluid className="dashboard-container">
            <h2 className="mb-4">Dashboard</h2>
            <Row>
                <Col md={8} className="mx-auto">
                    <Accordion
                        activeKey={activeKey}
                        onSelect={(e) =>
                            setActiveKey(e as string)
                        }
                    >
                        {(user?.role === 'Owner' ||
                            user?.role === 'Admin') && (
                            <>
                                <EmployeeSection eventKey="0" />
                                <UserSection eventKey="1" />
                            </>
                        )}
                        {user?.role === 'Owner' && (
                            <SupplierSection eventKey="2" />
                        )}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
