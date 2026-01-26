'use client';

import { Product } from '@/types';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
    formatGuaranies: (amount: number) => string;
}

const ProductCard = ({ product, onAddToCart, formatGuaranies }: ProductCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        onAddToCart();
        setTimeout(() => setIsAdding(false), 300);
    };

    return (
        <div className="card group">
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 rounded-full transition-all hover:bg-white"
                    aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                    <Heart
                        size={16}
                        className={isFavorite ? 'fill-accent text-accent' : 'text-dark'}
                    />
                </button>

                {product.stock && product.stock < 10 && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-accent text-white text-xs font-bold rounded-full">
                        ¡Quedan {product.stock}!
                    </div>
                )}
            </div>

            <div className="p-3 sm:p-4 md:p-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                    <h3 className="font-bold text-dark text-sm sm:text-base md:text-lg line-clamp-1">
                        {product.name}
                    </h3>
                    {product.category && (
                        <span className="text-xs bg-primary text-dark px-2 py-1 rounded-full self-start">
                            {product.category}
                        </span>
                    )}
                </div>

                <p className="text-text/70 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2 min-h-[2.5rem]">
                    {product.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-accent">
                            {formatGuaranies(product.price)}
                        </p>
                        {product.stock && (
                            <p className="text-xs text-text/60 mt-1">
                                Stock: {product.stock} unidades
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-full font-bold transition-all text-sm sm:text-base ${isAdding
                                ? 'bg-green-500 text-white'
                                : 'bg-primary text-dark hover:bg-accent hover:text-white'
                            }`}
                    >
                        {isAdding ? (
                            <>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Agregado</span>
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={16} className="sm:hidden" />
                                <ShoppingCart size={18} className="hidden sm:block" />
                                <span>Agregar</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;