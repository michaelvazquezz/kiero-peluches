'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));

        // Credenciales fijas para demo
        if (username === 'mari' && password === 'mari123') {
            localStorage.setItem('admin-authenticated', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Credenciales incorrectas. Usuario: mari / Contraseña: mari123');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary to-primary/30 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <span className="text-4xl">ʕ•ᴥ•ʔﾉ♥︎</span>
                        <h1 className="font-comic text-3xl font-bold text-dark mt-2">Kiero Admin</h1>
                    </Link>
                    <p className="text-text/70 mt-2">Panel de Administración</p>
                </div>

                {/* Card de Login */}
                <div className="bg-white rounded-2xl shadow-soft p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                            <Lock size={32} className="text-dark" />
                        </div>
                        <h2 className="text-2xl font-bold text-dark">Iniciar Sesión</h2>
                        <p className="text-text/70 mt-2">Ingresa tus credenciales de administrador</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Usuario */}
                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>Usuario</span>
                                </div>
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input"
                                placeholder="mari"
                                required
                            />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">
                                <div className="flex items-center gap-2">
                                    <Lock size={16} />
                                    <span>Contraseña</span>
                                </div>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input pr-10"
                                    placeholder="mari123"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/50 hover:text-text"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Demo Credentials */}
                        {/*  <div className="bg-light p-4 rounded-xl border-2 border-dashed border-primary">
                            <p className="text-sm font-semibold text-dark mb-2">👨‍💻 Credenciales para la demo:</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="text-text/70">Usuario:</span>
                                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">mari</code>
                                </div>
                                <div>
                                    <span className="text-text/70">Contraseña:</span>
                                    <code className="block bg-white px-2 py-1 rounded mt-1 font-mono">mari123</code>
                                </div>
                            </div>
                        </div> */}

                        {/* Botón de Login */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Verificando...</span>
                                </>
                            ) : (
                                <>
                                    <Lock size={20} />
                                    <span>Ingresar al Panel</span>
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <Link href="/" className="text-accent hover:text-dark text-sm font-semibold">
                                ← Volver a la tienda
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-text/50 text-sm">
                    <p>© {new Date().getFullYear()} Kiero Peluches - Panel de Administración</p>
                    <p className="mt-1">Versión 1.0.0</p>
                </div>
            </div>
        </div>
    );
}