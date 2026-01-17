import React from 'react';
import CustomButton from '../Button/CustomButton';

export default function EmptyState({
    icon = 'fas fa-inbox',
    title = 'No hay datos',
    description = 'No se encontraron registros para mostrar.',
    actionLabel,
    onAction
}) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border-2 border-dashed border-[var(--border-subtle)] bg-[var(--bg-soft)]">
            <div className="w-16 h-16 rounded-full bg-[var(--card)] flex items-center justify-center mb-4 shadow-sm border border-[var(--border-subtle)]">
                <i className={`${icon} text-2xl text-[var(--brand-400)]`}></i>
            </div>
            <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">{title}</h3>
            <p className="text-[var(--muted)] max-w-sm mb-6">{description}</p>

            {actionLabel && onAction && (
                <CustomButton variant="primary" onClick={onAction}>
                    {actionLabel}
                </CustomButton>
            )}
        </div>
    );
}
