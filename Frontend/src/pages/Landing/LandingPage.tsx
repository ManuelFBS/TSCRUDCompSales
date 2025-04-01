import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <Container className="text-center">
                <h1 className="display-4 mb-4">
                    Bienvenido al Sistema
                </h1>
                <p className="lead mb-5">
                    Sistema integral de gestión empresarial
                </p>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/login')}
                >
                    Iniciar Sesión
                </Button>
            </Container>
        </div>
    );
};

export default LandingPage;
