/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tus colores personalizados de Kiero Peluches
        primary: '#f9c8d9',      // Rosa claro
        secondary: '#fce4ec',    // Rosa muy claro
        accent: '#ff85a2',       // Rosa fuerte
        dark: '#a64d79',         // Morado oscuro
        text: '#5a3a4e',         // Morado/texto
        light: '#fff9fb',        // Blanco rosado
      },
      fontFamily: {
        // Tus fuentes personalizadas
        comic: ['Comic Neue', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        // Sombras personalizadas
        'soft': '0 4px 12px rgba(166, 77, 121, 0.1)',
        'hover': '0 8px 20px rgba(166, 77, 121, 0.15)',
      },
      borderRadius: {
        // Bordes redondeados personalizados
        'xl': '16px',
        '2xl': '25px',
      },
      animation: {
        // Animaciones personalizadas
        'bounce': 'bounce 2s infinite',
        'sparkle': 'sparkle 4s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        // Definición de las animaciones
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        sparkle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
    screens: {
        'xs': '375px',    // iPhone SE y pequeños
        'sm': '640px',    // Tablets pequeñas
        'md': '768px',    // Tablets
        'lg': '1024px',   // Laptops
        'xl': '1280px',   // Desktop
        '2xl': '1536px',  // Desktop grandes
    },
  },
  plugins: [],
}