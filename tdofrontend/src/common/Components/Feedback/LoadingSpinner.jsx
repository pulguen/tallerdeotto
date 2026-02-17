import React from 'react';

export default function LoadingSpinner({ text = 'Cargando...', fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="admin-loading admin-loading--fullscreen">
        <div className="admin-loading-spinner"></div>
        <p className="admin-loading-text">{text}</p>
      </div>
    );
  }

  return (
    <div className="admin-loading">
      <div className="admin-loading-spinner"></div>
      <p className="admin-loading-text">{text}</p>
    </div>
  );
}
