import React from 'react';

export default function TotalBox({ label, value, currency = true }) {
  return (
    <div className="border rounded shadow-sm p-3 bg-light d-flex flex-column align-items-start">
      <span className="text-muted">{label}</span>
      <h4 className="m-0">
        {currency ? `$ ${Number(value).toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : value}
      </h4>
    </div>
  );
}
