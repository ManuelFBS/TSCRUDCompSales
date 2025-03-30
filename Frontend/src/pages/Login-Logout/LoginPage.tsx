import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { login } from '../../api/authService';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const { login: setAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const {
                token,
                user: userData,
                fullName,
            } = await login({ user, password });
            setAuth(token, userData, fullName);
            // navigate('/dashboard');
            navigate('/background');
        } catch (error) {
            alert(`Login failed... Error: ${error}`);
        }
    };

    return (
        <>
            <div className="background-watermark"></div>
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <div
                    className="card shadow-lg"
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                    }}
                >
                    <div className="card-body p-4">
                        <h1 className="text-center mb-4">
                            <i className="bi bi-person-circle me-2"></i>
                            Login
                        </h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="user"
                                    className="form-label"
                                >
                                    <i className="bi bi-person-fill me-2"></i>
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="user"
                                    value={user}
                                    onChange={(e) =>
                                        setUser(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Ingrese su usuario"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    <i className="bi bi-key-fill me-2"></i>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Ingrese su contraseña"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                            >
                                <i className="bi bi-key-fill"></i>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
