import React from 'react';

export default function CommonModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="minimal-card admin-modal-card">
        <button
          type="button"
          onClick={onClose}
          className="admin-modal-close"
          aria-label="Cerrar modal"
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="admin-title-gradient admin-modal-title">{title}</h2>
        <div className="admin-modal-content">{children}</div>
      </div>
    </div>
  );
}
