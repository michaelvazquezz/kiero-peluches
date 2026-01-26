'use client';

interface AnimatedBackgroundProps {
    density?: 'low' | 'medium' | 'high';
    theme?: 'default' | 'festive' | 'magical';
}

export default function AnimatedBackground({
    density = 'medium',
    theme = 'festive'
}: AnimatedBackgroundProps) {

    const getDensityValue = () => {
        switch (density) {
            case 'low': return { icons: 15, confetti: 10 };
            case 'medium': return { icons: 25, confetti: 15 };
            case 'high': return { icons: 40, confetti: 20 };
            default: return { icons: 25, confetti: 15 };
        }
    };

    const { icons: iconCount, confetti: confettiCount } = getDensityValue();

    // Distribución en círculos concéntricos (Fibonacci-like)
    const positions = Array.from({ length: iconCount }).map((_, i) => {
        const angle = i * (Math.PI * (3 - Math.sqrt(5))); // Golden angle
        const radius = Math.sqrt(i / iconCount) * 0.85; // Distribución uniforme

        return {
            x: 50 + radius * Math.cos(angle) * 100,
            y: 50 + radius * Math.sin(angle) * 100,
            size: radius < 0.3 ? 'small' : radius < 0.6 ? 'medium' : 'large',
            zone: radius < 0.3 ? 'center' : radius < 0.6 ? 'middle' : 'outer',
        };
    });

    const getEmojiForZone = (zone: string, index: number) => {
        const emojis = {
            center: ['💖', '❤️', '💗', '⭐', '🌟', '✨', '💫'],
            middle: ['🐻', '🐰', '🦄', '🐘', '🐼', '🦊', '🐶', '🐱'],
            outer: ['🎈', '🎉', '🎊', '🎁', '🌼', '🌻', '🌸', '🌺', '😊', '🥰'],
        };

        const list = emojis[zone as keyof typeof emojis] || emojis.center;
        return list[index % list.length];
    };

    const getSizeClass = (size: string) => {
        switch (size) {
            case 'small': return 'text-base sm:text-lg';
            case 'medium': return 'text-lg sm:text-xl lg:text-2xl';
            case 'large': return 'text-xl sm:text-2xl lg:text-3xl';
            default: return 'text-lg';
        }
    };

    const getAnimation = (index: number, zone: string) => {
        const animations = ['animate-twinkle', 'animate-pulse', 'animate-gentle-sway', 'animate-float', 'animate-bounce'];
        const zoneAnimations = {
            center: ['animate-twinkle', 'animate-pulse'],
            middle: ['animate-float', 'animate-float-delay', 'animate-bounce-slow'],
            outer: ['animate-gentle-sway', 'animate-bounce', 'animate-float'],
        };

        const list = zoneAnimations[zone as keyof typeof zoneAnimations] || animations;
        return list[index % list.length];
    };

    const getDelay = (index: number) => {
        const delays = ['delay-75', 'delay-150', 'delay-225', 'delay-300', 'delay-375', 'delay-450'];
        return delays[index % delays.length];
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="relative w-full h-full">
                {/* Iconos distribuidos matemáticamente */}
                {positions.map((pos, i) => (
                    <div
                        key={`icon-${i}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                        }}
                    >
                        <div className={`
              ${getSizeClass(pos.size)}
              ${getAnimation(i, pos.zone)}
              ${getDelay(i)}
              ${pos.zone === 'center' ? 'text-pink-400' :
                                pos.zone === 'middle' ? 'text-dark' :
                                    'text-accent'}
            `}>
                            {getEmojiForZone(pos.zone, i)}
                        </div>
                    </div>
                ))}

                {/* Confeti distribuido en círculos */}
                {Array.from({ length: 3 }).map((_, circleIdx) => (
                    Array.from({ length: confettiCount / 3 }).map((_, pointIdx) => {
                        const totalPoints = confettiCount / 3;
                        const angle = (pointIdx / totalPoints) * Math.PI * 2;
                        const radius = 0.15 + circleIdx * 0.25;

                        return (
                            <div
                                key={`confetti-${circleIdx}-${pointIdx}`}
                                className="absolute rounded-full animate-bounce"
                                style={{
                                    width: '4px',
                                    height: '4px',
                                    left: `${50 + Math.cos(angle) * radius * 100}%`,
                                    top: `${50 + Math.sin(angle) * radius * 100}%`,
                                    backgroundColor: `hsl(${circleIdx * 120}, 80%, 65%)`,
                                    animationDelay: `${(circleIdx * totalPoints + pointIdx) * 30}ms`,
                                    animationDuration: `${1.2 + Math.random() * 0.8}s`,
                                }}
                            />
                        );
                    })
                )).flat()}
            </div>
        </div>
    );
}