import React, { useState } from 'react';
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
            const { token } = await login({
                user,
                password,
            });

            // setAuth(token,{id:}),dni:''
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed...!');
        }
    };

    return <></>;
};
