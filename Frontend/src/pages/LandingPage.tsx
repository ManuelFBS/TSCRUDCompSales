import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container fluid className="landing-page">
            <div className="landing-content">
                <img src={logo} alt="Remsys Logo" className="landing-logo" />
                <h1>Bienvenido a Remsys 1.0</h1>
                <p>Sistema de Gestión de Recursos Empresariales</p>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/login')}
                >
                    Ingresar al Sistema
                </Button>
            </div>
        </Container>
    );
};

export default LandingPage;
