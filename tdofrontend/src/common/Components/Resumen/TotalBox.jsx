import React from 'react';

export default function TotalBox({ label, value, currency = true, icon, colorClass = 'text-brand-500' }) {
  const isNegative = !currency && typeof value === 'number' && value < 0;
  const displayValue = currency
    ? `$ ${Number(value).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
    : value;

  return (
    <div className="minimal-card p-5 flex items-start justify-between min-w-[240px] hover:border-[var(--brand-500)] transition-colors duration-200">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[var(--muted)] mb-1 uppercase tracking-wider">
          {label}
        </span>
        <h3 className={`m-0 font-bold text-2xl ${isNegative ? 'text-red-500' : 'text-[var(--ink)]'}`}>
          {displayValue}
        </h3>
      </div>

      {icon && (
        <div className={`w-12 h-12 rounded-xl bg-[var(--bg)] flex items-center justify-center border border-[var(--border-subtle)] ${colorClass}`}>
          <i className={`${icon} text-xl opacity-90`}></i>
        </div>
      )}
    </div>
  );
}
