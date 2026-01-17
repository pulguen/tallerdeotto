import React from 'react';

export default function CommonModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="minimal-card w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-xl font-semibold mb-6 admin-title-gradient">{title}</h2>
        {children}
      </div>
    </div>
  );
}
