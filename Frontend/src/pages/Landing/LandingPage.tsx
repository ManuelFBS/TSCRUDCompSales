import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-background">
            <div
                className="container min-vh-100 d-flex flex-column align-items-end pt-5"
                style={{
                    width: '50%',
                    marginTop: '0',
                    marginRight: '5px',
                }}
            >
                <div
                    className="text-center text-white p-4 rounded"
                    style={{
                        backgroundColor:
                            'rgba(20,20,250,0.2)',
                    }}
                >
                    <h1 className="display-10 mb-4">
                        Bienvenido a <br /> MTM-App 1.0
                    </h1>
                    <p
                        className="lead mb-4"
                        style={{
                            color: 'rgba(100,100,255,1.0)',
                        }}
                    >
                        App diseñada para ventas y
                        adquisiciones <br />
                        de insumos electrónicos y otros...
                    </p>

                    <button
                        className="btn btn-custom-primary btn-lg"
                        onClick={() => navigate('/login')}
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Ingresar
                    </button>
                </div>
            </div>
        </div>
    );
};
