import React from 'react';

export default function CustomButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // Bootstrap: primary, secondary, success, danger, etc.
  size = 'md',         // Bootstrap: sm, md, lg
  disabled = false,
  loading = false,
  startIcon = null,
  endIcon = null,
  className = '',
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
    sizeClass,
    disabled || loading ? 'disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading && (
        <span
          className="spinner-border spinner-border-sm me-2"
          role="status"
          aria-hidden="true"
        />
      )}
      {startIcon && <span className="me-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ms-2">{endIcon}</span>}
    </button>
  );
}
