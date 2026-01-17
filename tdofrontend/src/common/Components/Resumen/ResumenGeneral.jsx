import React from 'react';
import TotalBox from './TotalBox';

export default function ResumenGeneral({ items = [] }) {
  return (
    <div className="resumen-grid">
      {items.map((item, idx) => (
        <TotalBox
          key={idx}
          label={item.label}
          value={item.value}
          currency={item.currency !== false}
          icon={item.icon}
          colorClass={item.colorClass}
        />
      ))}
    </div>
  );
}
