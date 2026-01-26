'use client';

export default function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary">
            <div className="text-center">
                <div className="relative">
                    {/* Spinner principal */}
                    <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>

                    {/* Peluche dentro del spinner */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl">🧸</span>
                    </div>
                </div>

                <h2 className="mt-6 text-xl font-bold text-dark font-comic">
                    Cargando...
                </h2>
                <p className="mt-2 text-text/70">
                    Preparando todo con amor 💖
                </p>
            </div>
        </div>
    );
}