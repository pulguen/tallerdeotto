import React from 'react';

export default function LoadingSpinner({ text = 'Cargando...', fullScreen = false }) {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg)]/80 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-[var(--border-subtle)] border-t-[var(--brand-500)] rounded-full animate-spin mb-4"></div>
                <p className="text-[var(--brand-400)] font-medium animate-pulse">{text}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full">
            <div className="w-8 h-8 border-3 border-[var(--border-subtle)] border-t-[var(--brand-500)] rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-[var(--muted)]">{text}</p>
        </div>
    );
}
