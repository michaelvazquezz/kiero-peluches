'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Home, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
    cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="bg-primary shadow-soft sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo - Siempre visible */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3">
                        <span className="text-2xl md:text-3xl">ʕ•ᴥ•ʔﾉ♥︎</span>
                        <div>
                            <h1 className="font-comic text-xl md:text-2xl lg:text-3xl font-bold text-dark">
                                Kiero
                            </h1>
                            <p className="hidden md:block text-xs text-text/80">
                                Peluches con amor 💖
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Oculto en móvil */}
                    <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                        <Link
                            href="/"
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${pathname === '/'
                                    ? 'bg-accent text-white'
                                    : 'text-dark hover:bg-white/50'
                                }`}
                        >
                            <Home size={18} />
                            <span className="font-semibold">Inicio</span>
                        </Link>

                        <Link
                            href="/"
                            className="relative p-2 text-dark hover:text-accent"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('cart-section')?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/admin/login"
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${pathname.includes('/admin')
                                    ? 'bg-accent text-white'
                                    : 'text-dark hover:bg-white/50'
                                }`}
                        >
                            <User size={18} />
                            <span className="font-semibold">Admin</span>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Link
                            href="/"
                            className="relative p-2 text-dark"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('cart-section')?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-dark"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 animate-slide-up">
                        <div className="flex flex-col gap-2 bg-white/90 rounded-xl p-4">
                            <Link
                                href="/"
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/'
                                        ? 'bg-accent text-white'
                                        : 'text-dark hover:bg-primary/50'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home size={20} />
                                <span className="font-semibold">Inicio</span>
                            </Link>

                            <Link
                                href="/admin/login"
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname.includes('/admin')
                                        ? 'bg-accent text-white'
                                        : 'text-dark hover:bg-primary/50'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User size={20} />
                                <span className="font-semibold">Panel Admin</span>
                            </Link>

                            <div className="px-4 py-3 bg-primary/30 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <ShoppingCart size={20} />
                                        <span className="font-semibold">Carrito</span>
                                    </div>
                                    <span className="bg-accent text-white text-sm font-bold rounded-full px-2 py-1 min-w-6 text-center">
                                        {cartCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;