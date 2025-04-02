import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container className="not-found-container">
            <h1>404 - Página no encontrada</h1>
            <p>
                Lo sentimos, la página que estás buscando no
                existe.
            </p>
            <Button
                variant="primary"
                onClick={() => navigate('/')}
            >
                Volver al inicio
            </Button>
        </Container>
    );
};

export default NotFound;
