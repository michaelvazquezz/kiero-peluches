'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import WelcomeModal from '@/components/Shared/WelcomeModal';
import ProductCard from '@/components/ProductCard/ProductCard';
import Cart from '@/components/Cart/Cart';
import Notification from '@/components/Shared/Notification';
import { products } from '@/lib/data';
import { CartItem } from '@/types';
import { formatGuaranies, calculateCartTotal } from '@/lib/utils';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Cargar carrito del localStorage al iniciar

  /*   useEffect(() => {
      const savedCart = localStorage.getItem('kiero-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }, []); */
  useEffect(() => {
    const savedCart = localStorage.getItem('kiero-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        localStorage.removeItem('kiero-cart');
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('kiero-cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;

      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      showNotification(`¡${product.name} agregado al carrito! 🛍️`);
      return newCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
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
    showNotification('Producto eliminado del carrito');
  };

  const clearCart = () => {
    setCart([]);
    showNotification('Carrito vaciado');
  };

  const cartTotal = calculateCartTotal(cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} />

      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      <main className="container mx-auto px-3 sm:px-4 py-6 md:py-8">
        {/* Banner */}
        <div className="mb-6 md:mb-8 p-4 sm:p-6 bg-gradient-to-r from-primary to-accent/20 rounded-xl md:rounded-2xl text-center">
          <h1 className="font-comic text-2xl sm:text-3xl md:text-4xl text-dark mb-2 md:mb-3">
            🧸 Encuentra tu Peluche Perfecto 🧸
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text">
            Peluches artesanales hechos con mucho amor y ternura
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Sección Productos */}
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
              <h2 className="font-comic text-xl sm:text-2xl md:text-3xl text-dark">
                Nuestros Peluches Más Tiernos
              </h2>
              <span className="text-xs sm:text-sm text-text/70 bg-primary/30 px-3 py-1 rounded-full">
                {products.length} productos
              </span>
            </div>

            {/* Nota de moneda */}
            <div className="mb-4 md:mb-6 p-3 sm:p-4 bg-light rounded-lg md:rounded-xl border-2 border-dashed border-accent">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                <span className="text-lg sm:text-xl">💵</span>
                <div>
                  <p className="font-bold text-sm sm:text-base">
                    Todos los precios en <span className="text-accent">Guaraníes (Gs.)</span>
                  </p>
                  <p className="text-xs sm:text-sm mt-1">
                    ¡Envíos a todo el país!
                  </p>
                </div>
              </div>
            </div>

            {/* Grid de Productos RESPONSIVE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart({ ...product, quantity: 1 })}
                  formatGuaranies={formatGuaranies}
                />
              ))}
            </div>

            {/* Sección de beneficios */}
            <div className="mt-8 md:mt-12 p-4 sm:p-6 bg-white rounded-xl md:rounded-2xl shadow-soft">
              <h3 className="font-comic text-lg sm:text-xl md:text-2xl text-dark mb-4">
                ✨ ¿Por qué elegir Kiero Peluches?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: '🧵', title: 'Hechos a Mano', desc: 'Cada peluche es único' },
                  { icon: '🚚', title: 'Envío Rápido', desc: '24-48 horas' },
                  { icon: '💝', title: 'Regalo Perfecto', desc: 'Tarjeta personalizada gratis' },
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-3 sm:p-4 border border-primary/20 rounded-xl">
                    <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
                    <h4 className="font-bold text-dark text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-text/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sección Carrito - Sticky en mobile */}
          <div className="w-full lg:w-1/3">
            <div id="cart-section" className="sticky top-20 lg:top-24">
              <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-soft">
                <h2 className="font-comic text-xl sm:text-2xl text-dark mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-dashed border-accent">
                  🛒 Tu Carrito
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

              {/* Info de Contacto */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-primary/50 to-accent/20 rounded-xl md:rounded-2xl">
                <h3 className="font-bold text-dark mb-2 sm:mb-3 text-sm sm:text-base">📞 Contacto</h3>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <p className="text-text">
                    <strong>WhatsApp:</strong> +595 981 123 456
                  </p>
                  <p className="text-text">
                    <strong>Horario:</strong> Lunes a Sábado 9:00 - 18:00
                  </p>
                  <p className="text-text">
                    <strong>Envíos:</strong> Todo Paraguay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <footer className="bg-primary mt-8 md:mt-12 py-4 md:py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-dark font-semibold text-sm md:text-base">
            Kiero Peluches 🧸
          </p>
          <p className="text-text/70 text-xs md:text-sm mt-1 md:mt-2">
            © {new Date().getFullYear()} - Todos los derechos reservados
          </p>
          <div className="mt-2 md:mt-3 flex justify-center gap-4 text-xs md:text-sm">
            <a href="#" className="text-text hover:text-accent">Términos</a>
            <a href="#" className="text-text hover:text-accent">Privacidad</a>
            <a href="#" className="text-text hover:text-accent">Contacto</a>
          </div>
        </div>
      </footer>
    </>
  );
}