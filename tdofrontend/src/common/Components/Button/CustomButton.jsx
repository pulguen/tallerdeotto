// src/common/components/CustomButton/CustomButton.jsx
import React from 'react';
import './CustomButton.css';

export default function CustomButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // bootstrap-like: primary, outline-primary, etc.
  size = 'md',         // sm, md, lg
  disabled = false,
  loading = false,
  startIcon = null,
  endIcon = null,
  className = '',
  as = 'button',       // ✅ 'button' | 'a'
  href,
  target,
  rel,
  ...props
}) {
  const sizeClass = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }[size];

  const classes = [
    'btn',
    `btn-${variant}`,
    'tdo-btn',          // ✅ marca única para estilar sin pelear con bootstrap
    sizeClass,
    (disabled || loading) ? 'disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const Component = as;

  const commonProps = {
    className: classes,
    onClick,
    ...props,
  };

  // Si es link, no usamos "disabled" nativo (no existe en <a>)
  if (as === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-disabled={disabled || loading}
        tabIndex={(disabled || loading) ? -1 : undefined}
        {...commonProps}
      >
        {loading && (
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
        )}
        {startIcon && <span className="me-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="ms-2">{endIcon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      {...commonProps}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
      )}
      {startIcon && <span className="me-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ms-2">{endIcon}</span>}
    </button>
  );
}
