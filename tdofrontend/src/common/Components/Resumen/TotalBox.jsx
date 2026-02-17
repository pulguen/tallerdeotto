import React from 'react';

export default function TotalBox({ label, value, currency = true, icon, colorClass = '' }) {
  const isNegative = !currency && typeof value === 'number' && value < 0;
  const displayValue = currency
    ? `$ ${Number(value).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
    : value;

  return (
    <div className="minimal-card admin-total-box">
      <div className="admin-total-box-meta">
        <span className="admin-total-box-label">{label}</span>
        <h3 className={`admin-total-box-value ${isNegative ? 'is-negative' : ''}`}>{displayValue}</h3>
      </div>

      {icon && (
        <div className={`admin-total-box-icon ${colorClass}`.trim()}>
          <i className={`${icon} fa-lg`}></i>
        </div>
      )}
    </div>
  );
}
