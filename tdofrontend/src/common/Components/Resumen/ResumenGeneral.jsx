import React from 'react';
import TotalBox from './TotalBox';

export default function ResumenGeneral({ items = [] }) {
  return (
    <div className="d-flex flex-wrap gap-3 mb-4">
      {items.map((item, idx) => (
        <TotalBox
          key={idx}
          label={item.label}
          value={item.value}
          currency={item.currency !== false}
        />
      ))}
    </div>
  );
}
