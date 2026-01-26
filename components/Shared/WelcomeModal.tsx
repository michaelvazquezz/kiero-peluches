'use client';

import { Heart, X, Sparkles, Star, Gift } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WelcomeModalProps {
    onClose: () => void;
}

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
    const [positions, setPositions] = useState<Array<{ x: number, y: number }>>([]);
    const [confettiPositions, setConfettiPositions] = useState<Array<any>>([]);
    // Generar posiciones solo en el cliente
    useEffect(() => {
        // Generar posiciones para iconos
        const iconPositions = Array.from({ length: 25 }).map((_, i) => {
            const angle = i * (Math.PI * (3 - Math.sqrt(5)));
            const radius = Math.sqrt(i / 25) * 0.85;
            return {
                x: 50 + radius * Math.cos(angle) * 100,
                y: 50 + radius * Math.sin(angle) * 100,
                size: radius < 0.3 ? 'small' : radius < 0.6 ? 'medium' : 'large',
                zone: radius < 0.3 ? 'center' : radius < 0.6 ? 'middle' : 'outer',
            };
        });

        // Generar posiciones para confetti
        const confettiPos = Array.from({ length: 3 }).flatMap((_, circleIdx) =>
            Array.from({ length: 5 }).map((_, pointIdx) => {
                const angle = (pointIdx / 5) * Math.PI * 2;
                const radius = 0.15 + circleIdx * 0.25;
                return {
                    left: 50 + Math.cos(angle) * radius * 100,
                    top: 50 + Math.sin(angle) * radius * 100,
                    color: `hsl(${circleIdx * 120}, 80%, 65%)`,
                    delay: (circleIdx * 5 + pointIdx) * 30,
                    duration: 1.2 + Math.random() * 0.8,
                };
            })
        );

        setPositions(iconPositions);
        setConfettiPositions(confettiPos);
    }, []);
    // Renderizar placeholder mientras se cargan las posiciones
    if (positions.length === 0) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-purple-50/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 max-w-md w-full border-4 border-white">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🧸✨</div>
                        <h2 className="font-comic text-3xl text-dark mb-4">
                            ¡Preparando la magia!
                        </h2>
                    </div>
                </div>
            </div>
        );
    }





    return (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-purple-50/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
            {/* Fondo con elementos decorativos */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Distribución basada en el "Golden Ratio" para máxima armonía */}
                <div className="relative w-full h-full">

                    {/* Función para distribuir puntos en espiral dorada */}
                    {(() => {
                        const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 grados
                        const points = [];
                        const totalPoints = 30; // Total de iconos

                        for (let i = 0; i < totalPoints; i++) {
                            const radius = Math.sqrt(i / totalPoints) * 0.8; // 80% del radio máximo
                            const angle = i * goldenAngle;

                            const x = 50 + radius * Math.cos(angle) * 100; // Porcentaje horizontal
                            const y = 50 + radius * Math.sin(angle) * 100; // Porcentaje vertical

                            points.push({ x, y, index: i });
                        }

                        return points.map((point, i) => {
                            // Determinar qué tipo de icono según la posición
                            let emoji, size, animation, delay, hide;
                            const distanceFromCenter = Math.sqrt(Math.pow(point.x - 50, 2) + Math.pow(point.y - 50, 2)) / 100;

                            if (distanceFromCenter < 0.3) {
                                // Zona central: corazones y estrellas
                                const centralEmojis = ['💖', '❤️', '💗', '💓', '💘', '⭐', '🌟', '✨'];
                                emoji = centralEmojis[i % centralEmojis.length];
                                size = 'text-lg sm:text-xl';
                                animation = i % 2 === 0 ? 'animate-pulse' : 'animate-twinkle';
                                delay = `delay-${(i * 75) % 1000}`;
                            } else if (distanceFromCenter < 0.6) {
                                // Zona media: peluches
                                const animalEmojis = ['🐻', '🐰', '🦄', '🐘', '🐼', '🦊', '🐶', '🐱', '🐬', '🦕', '🦖', '🐙', '🦁', '🐯', '🐥', '🐸'];
                                emoji = animalEmojis[i % animalEmojis.length];
                                size = 'text-xl sm:text-2xl lg:text-3xl';
                                animation = i % 3 === 0 ? 'animate-float' : i % 3 === 1 ? 'animate-float-delay' : 'animate-bounce-slow';
                                delay = `delay-${(i * 100) % 1000}`;
                                hide = i > 15 ? 'hidden sm:block' : '';
                            } else {
                                // Zona exterior: elementos de fiesta
                                const partyEmojis = ['🎈', '🎉', '🎊', '🎁', '🌼', '🌻', '🌸', '🌺'];
                                emoji = partyEmojis[i % partyEmojis.length];
                                size = 'text-base sm:text-lg lg:text-xl';
                                animation = i % 2 === 0 ? 'animate-gentle-sway' : 'animate-bounce';
                                delay = `delay-${(i * 125) % 1000}`;
                                hide = i > 10 ? 'hidden md:block' : i > 20 ? 'hidden lg:block' : '';
                            }

                            // Colores según posición
                            const hue = (i * 137.5) % 360;
                            const colorStyle = { filter: `hue-rotate(${hue}deg)` };

                            return (
                                <div
                                    key={`spiral-${i}`}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${hide || ''}`}
                                    style={{
                                        left: `${point.x}%`,
                                        top: `${point.y}%`,
                                        ...colorStyle,
                                    }}
                                >
                                    <div className={`
              ${size}
              ${animation}
              ${delay}
            `}>
                                        {emoji}
                                    </div>
                                </div>
                            );
                        });
                    })()}

                    {/* Confeti distribuido en círculos concéntricos */}
                    {Array.from({ length: 5 }).map((_, circleIndex) => (
                        Array.from({ length: 8 }).map((_, pointIndex) => {
                            const angle = (pointIndex / 8) * Math.PI * 2;
                            const radius = 0.2 + circleIndex * 0.15; // 20%, 35%, 50%, 65%, 80%

                            return (
                                <div
                                    key={`confetti-${circleIndex}-${pointIndex}`}
                                    className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-bounce"
                                    style={{
                                        left: `${50 + Math.cos(angle) * radius * 100}%`,
                                        top: `${50 + Math.sin(angle) * radius * 100}%`,
                                        backgroundColor: `hsl(${circleIndex * 72}, 80%, 70%)`,
                                        animationDelay: `${(circleIndex * 8 + pointIndex) * 50}ms`,
                                        animationDuration: `${1 + Math.random()}s`,
                                    }}
                                />
                            );
                        })
                    )).flat()}
                </div>
            </div>

            {/* Contenedor principal del modal */}
            <div className="relative bg-gradient-to-br from-primary via-pink-100 to-secondary rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full shadow-2xl border-4 sm:border-6 md:border-8 border-white animate-scale-in">

                {/* Efecto de brillo */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-pink-400 rounded-2xl md:rounded-3xl opacity-20 blur-lg"></div>

                {/* Decoración de esquinas */}
                <div className="absolute -top-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                    <Star size={16} className="sm:hidden" />
                    <Star size={20} className="hidden sm:block md:hidden" />
                    <Star size={24} className="hidden md:block" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                    <Gift size={16} className="sm:hidden" />
                    <Gift size={20} className="hidden sm:block md:hidden" />
                    <Gift size={24} className="hidden md:block" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                    <Sparkles size={16} className="sm:hidden" />
                    <Sparkles size={20} className="hidden sm:block md:hidden" />
                    <Sparkles size={24} className="hidden md:block" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center text-white text-lg sm:text-xl">
                    <Heart size={16} className="sm:hidden" />
                    <Heart size={20} className="hidden sm:block md:hidden" />
                    <Heart size={24} className="hidden md:block" />
                </div>

                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-accent rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:scale-110 hover:rotate-90 z-10"
                    aria-label="Cerrar bienvenida"
                >
                    <X size={16} className="sm:hidden" />
                    <X size={20} className="hidden sm:block" />
                </button>

                {/* Contenido */}
                <div className="relative z-0 text-center">
                    {/* Animación principal */}
                    <div className="relative mb-4 sm:mb-6">
                        <div className="text-5xl sm:text-6xl md:text-7xl mb-2 animate-bounce">
                            🧸
                        </div>
                        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-2xl sm:text-3xl md:text-4xl animate-ping">
                            ✨
                        </div>
                        <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 text-2xl sm:text-3xl md:text-4xl animate-pulse">
                            💖
                        </div>
                    </div>

                    {/* Título */}
                    <h2 className="font-comic text-2xl sm:text-3xl md:text-4xl text-dark mb-3 sm:mb-4 bg-gradient-to-r from-dark to-accent bg-clip-text text-transparent">
                        ¡Holis, bienvenid@! 🎉
                    </h2>

                    {/* Mensajes */}
                    <div className="space-y-2 sm:space-y-3 text-text mb-5 sm:mb-6 md:mb-8">
                        <p className="text-sm sm:text-base md:text-lg bg-white/70 rounded-xl p-2 sm:p-3 animate-slide-up delay-100">
                            <span className="font-bold text-accent">🎀 Somos un shop online</span> que trabaja sobre pedido
                        </p>
                        <p className="text-sm sm:text-base md:text-lg bg-white/70 rounded-xl p-2 sm:p-3 animate-slide-up delay-200">
                            <span className="font-bold text-accent">🌟 Descubre</span> nuestros peluches más tiernos y adorables
                        </p>
                        <p className="text-sm sm:text-base md:text-lg bg-white/70 rounded-xl p-2 sm:p-3 animate-slide-up delay-300">
                            <span className="font-bold text-accent">🛍️ ¡Agrega tus favoritos</span> al carrito y llévate un poquito de ternura!
                        </p>
                    </div>

                    {/* Botón principal */}
                    <button
                        onClick={onClose}
                        className="group relative bg-gradient-to-r from-accent via-pink-400 to-accent text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 active:scale-95 w-full max-w-xs mx-auto overflow-hidden animate-pulse-slow"
                    >
                        {/* Efecto de brillo en hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        <div className="flex items-center justify-center gap-2 sm:gap-3 relative z-10">
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-ping" />
                            <span className="text-sm sm:text-base md:text-lg">
                                ¡Empezar a Comprar!
                            </span>
                            <Star className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-spin" />
                        </div>
                    </button>

                    {/* Texto pequeño */}
                    <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-text/70 animate-fade-in delay-500">
                        💕 Hecho con mucho amor para ti
                    </p>
                </div>
            </div>
        </div>
    );
}