import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import styles from './styles.module.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.landingContainer}>
            <Container className={styles.content}>
                <h1 className={styles.title}>Bienvenido a Remsys 1.0</h1>
                <p className={styles.subtitle}>
                    Aplicación para venta y adquisiciones de equipos
                    electrónicos, computación, software y más...
                </p>

                <div className={styles.buttonContainer}>
                    <Button
                        variant="primary"
                        size="lg"
                        className={styles.button}
                        onClick={() => navigate('/login')}
                    >
                        Ingresar
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage;
