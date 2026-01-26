'use client';

import { CartItem } from '@/types';
import { ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface CartProps {
    cart: CartItem[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemoveItem: (productId: number) => void;
    onClearCart: () => void;
    cartTotal: number;
    formatGuaranies: (amount: number) => string;
}

export default function Cart({
    cart,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
    cartTotal,
    formatGuaranies
}: CartProps) {
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    if (cart.length === 0) {
        return (
            <div className="text-center py-6 sm:py-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🛒</div>
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-2">
                    Tu carrito está vacío
                </h3>
                <p className="text-text/70 text-sm sm:text-base">
                    ¡Agrega algún peluche tierno!
                </p>
                <div className="text-2xl sm:text-3xl animate-bounce mt-4">👇</div>
            </div>
        );
    }

    return (
        <div>
            {/* Resumen */}
            <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-light rounded-lg md:rounded-xl">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={16} className="sm:hidden text-accent" />
                        <ShoppingBag size={20} className="hidden sm:block text-accent" />
                        <span className="font-semibold text-sm sm:text-base">Resumen</span>
                    </div>
                    <button
                        onClick={onClearCart}
                        className="flex items-center gap-1 text-xs sm:text-sm text-red-500 hover:text-red-700"
                    >
                        <Trash2 size={14} className="sm:hidden" />
                        <Trash2 size={16} className="hidden sm:block" />
                        <span>Vaciar</span>
                    </button>
                </div>

                <div className="space-y-1 max-h-24 sm:max-h-32 overflow-y-auto pr-1">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                            <span className="truncate max-w-[60%]">{item.name}</span>
                            <span className="font-semibold whitespace-nowrap">
                                {item.quantity} × {formatGuaranies(item.price)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Items del carrito */}
            <div className="max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-y-auto pr-2 mb-4 sm:mb-6">
                {cart.map(item => (
                    <div key={item.id} className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-primary/20">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-dark text-sm sm:text-base truncate">
                                {item.name}
                            </h4>
                            <p className="text-accent font-bold text-sm sm:text-base">
                                {formatGuaranies(item.price)}
                            </p>

                            <div className="flex items-center gap-2 mt-1 sm:mt-2">
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center text-xs sm:text-sm"
                                    aria-label="Reducir cantidad"
                                >
                                    -
                                </button>
                                <span className="font-bold text-sm sm:text-base min-w-[20px] text-center">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center text-xs sm:text-sm"
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            aria-label="Eliminar producto"
                        >
                            <Trash2 size={14} className="sm:hidden" />
                            <Trash2 size={16} className="hidden sm:block" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Total y checkout */}
            <div className="border-t-2 border-primary pt-3 sm:pt-4">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className="text-base sm:text-lg font-bold text-dark">Total:</span>
                    <span className="text-xl sm:text-2xl font-bold text-accent">
                        {formatGuaranies(cartTotal)}
                    </span>
                </div>

                <button
                    onClick={() => {
                        setIsCheckingOut(true);
                        setTimeout(() => {
                            alert('¡Compra simulada exitosa! 🎉\nTotal: ' + formatGuaranies(cartTotal));
                            setIsCheckingOut(false);
                            onClearCart();
                        }, 1500);
                    }}
                    disabled={isCheckingOut}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-2.5 sm:py-3 text-sm sm:text-base"
                >
                    {isCheckingOut ? (
                        <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Procesando...</span>
                        </>
                    ) : (
                        <>
                            <CreditCard size={16} className="sm:hidden" />
                            <CreditCard size={20} className="hidden sm:block" />
                            <span>Finalizar Compra</span>
                        </>
                    )}
                </button>

                <p className="text-center text-xs text-text/60 mt-2 sm:mt-3">
                    🔒 Compra 100% segura
                </p>
            </div>
        </div>
    );
};