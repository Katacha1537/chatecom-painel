'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const sessionOn = sessionStorage.getItem('sessionVALUE');
        const correctToken = process.env.NEXT_PUBLIC_PASSWORD;

        if (sessionOn === correctToken) {
            router.push('/dashboard');
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const correctUsername = process.env.NEXT_PUBLIC_USER;
        const correctPassword = process.env.NEXT_PUBLIC_PASSWORD;
        const correctToken = process.env.NEXT_PUBLIC_PASSWORD;

        if (username === correctUsername && password === correctPassword) {
            sessionStorage.setItem('sessionVALUE', correctToken);
            router.push('/dashboard');  // Redirecionar para o dashboard ou página protegida
        } else {
            setError('Usuário ou senha incorretos');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-white text-xl">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
                <img className='rounded-lg w-full mb-4' src="https://i.postimg.cc/50ggxRf4/chatecom-logo-g.jpg" alt="chatecom" />
                <div className="mb-4">
                    <input
                        id="username"
                        value={username}
                        placeholder='Usuário'
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border-b-2 rounded-lg shadow-sm focus:border-4 focus:border-solid focus:border-l-transparent "
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        placeholder='Senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border-b-2 rounded-lg shadow-sm focus:border-4 focus:border-solid focus:border-l-transparent "
                        required
                    />
                </div>
                {error && <p className="mb-4 text-red-600">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-[#1557C7] font-bold text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
