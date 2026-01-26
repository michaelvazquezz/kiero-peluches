'use client';

import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-soft ${type === 'success'
                    ? 'bg-green-100 text-green-800 border-l-4 border-green-500'
                    : 'bg-red-100 text-red-800 border-l-4 border-red-500'
                }`}>
                {type === 'success' ? (
                    <CheckCircle size={20} className="text-green-500" />
                ) : (
                    <XCircle size={20} className="text-red-500" />
                )}

                <span className="font-semibold">{message}</span>

                <button
                    onClick={onClose}
                    className="ml-2 hover:opacity-70"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}