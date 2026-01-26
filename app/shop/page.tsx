'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import ProductCard from '@/components/ProductCard/ProductCard';
import Cart from '@/components/Cart/Cart';
import { products } from '@/lib/data';
import { CartItem } from '@/types';
import { formatGuaranies, calculateCartTotal } from '@/lib/utils';

export default function ShopPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    // Cargar carrito del localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('kiero-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Guardar carrito en localStorage
    useEffect(() => {
        localStorage.setItem('kiero-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            return existingItem
                ? prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) {
            setCart(prevCart => prevCart.filter(item => item.id !== productId));
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = calculateCartTotal(cart);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const categories = ['Todos', 'Osos', 'Animales', 'Fantásticos', 'Dinosaurios', 'Gatos', 'Perros'];

    const filteredProducts = selectedCategory === 'Todos'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <>
            <Header cartCount={cartCount} />

            <main className="container mx-auto px-4 py-8">
                <h1 className="font-comic text-3xl md:text-4xl text-dark text-center mb-2">
                    🛍️ Tienda Completa
                </h1>
                <p className="text-center text-text/70 mb-8">
                    Descubre todos nuestros peluches
                </p>

                {/* Filtros por categoría */}
                <div className="mb-8">
                    <h2 className="font-bold text-dark mb-4">Filtrar por categoría:</h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full transition-all ${selectedCategory === category
                                    ? 'bg-accent text-white'
                                    : 'bg-primary text-dark hover:bg-accent/20'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Productos */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => addToCart({ ...product, quantity: 1 })}
                                    formatGuaranies={formatGuaranies}
                                />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">😔</div>
                                <h3 className="text-xl font-bold text-dark mb-2">
                                    No hay productos en esta categoría
                                </h3>
                                <button
                                    onClick={() => setSelectedCategory('Todos')}
                                    className="btn-primary mt-4"
                                >
                                    Ver todos los productos
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Carrito */}
                    <div className="sticky top-24 h-fit">
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <h2 className="font-comic text-2xl text-dark mb-6 pb-3 border-b-2 border-dashed border-accent">
                                🛒 Tu Carrito ({cartCount})
                            </h2>

                            <Cart
                                cart={cart}
                                onUpdateQuantity={updateQuantity}
                                onRemoveItem={removeFromCart}
                                onClearCart={clearCart}
                                cartTotal={cartTotal}
                                formatGuaranies={formatGuaranies}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}