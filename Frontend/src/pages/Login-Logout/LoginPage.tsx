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
            const { token, user: userData } = await login({
                user,
                password,
            });

            setAuth(token, userData);
            navigate('/dashboard');
        } catch (error) {
            alert(`Login failed... Error: ${error}`);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label
                        htmlFor="user"
                        className="form-label"
                    >
                        Usuario
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="user"
                        value={user}
                        onChange={(e) =>
                            setUser(e.target.value)
                        }
                    />
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Login
                </button>
            </form>
        </div>
    );
};
