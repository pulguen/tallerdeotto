import React from 'react';
import CustomButton from '../Button/CustomButton';

export default function EmptyState({
  icon = 'fas fa-inbox',
  title = 'No hay datos',
  description = 'No se encontraron registros para mostrar.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="admin-empty-state">
      <div className="admin-empty-state-icon">
        <i className={`${icon} fa-lg`}></i>
      </div>
      <h3 className="admin-empty-state-title">{title}</h3>
      <p className="admin-empty-state-description">{description}</p>

      {actionLabel && onAction && (
        <CustomButton variant="primary" onClick={onAction}>
          {actionLabel}
        </CustomButton>
      )}
    </div>
  );
}
