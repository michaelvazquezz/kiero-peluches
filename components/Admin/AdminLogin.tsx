'use client';

import { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface AdminLoginProps {
    onLogin: (username: string, password: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        if (username === 'mari' && password === 'mari123') {
            onLogin(username, password);
        } else {
            setError('Credenciales incorrectas');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary to-primary/30 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <span className="text-4xl">ʕ•ᴥ•ʔﾉ♥︎</span>
                        <h1 className="font-comic text-3xl font-bold text-dark mt-2">Kiero Admin</h1>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-soft p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                            <Lock size={32} className="text-dark" />
                        </div>
                        <h2 className="text-2xl font-bold text-dark">Iniciar Sesión</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">
                                Usuario
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-primary focus:outline-none focus:border-accent"
                                placeholder="mari"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-primary focus:outline-none focus:border-accent pr-10"
                                    placeholder="mari123"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/50"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="bg-light p-4 rounded-xl border-2 border-dashed border-primary">
                            <p className="text-sm font-semibold text-dark mb-2">Credenciales para la demo:</p>
                            <div className="text-sm">
                                <p><strong>Usuario:</strong> mari</p>
                                <p><strong>Contraseña:</strong> mari123</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent text-white px-6 py-3 rounded-full font-bold hover:bg-dark transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Verificando...' : 'Ingresar al Panel'}
                        </button>

                        <div className="text-center">
                            <Link href="/" className="text-accent hover:text-dark text-sm font-semibold">
                                ← Volver a la tienda
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}