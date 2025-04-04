import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container className="py-5 text-center">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="display-1">404</h1>
                    <h2 className="mb-4">Página no encontrada</h2>
                    <p className="lead mb-5">
                        Lo sentimos, la página que estás buscando no existe o ha
                        sido movida.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/')}
                        size="lg"
                    >
                        Volver al inicio
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
