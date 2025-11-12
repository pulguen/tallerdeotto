import React, { useState } from 'react';
import Input from './Input';

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? 'text' : 'password'}
        icon={
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8m0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"/>
          </svg>
        }
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
        aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        {show ? (
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="currentColor" d="M2 5.27L3.28 4l16.97 16.97L19.97 22l-2.38-2.38A10.91 10.91 0 0 1 12 20C7 20 2.73 16.89 1 12a12.65 12.65 0 0 1 4.24-5.73L2 5.27M12 6a6 6 0 0 1 6 6c0 .73-.13 1.42-.36 2.07l-7.71-7.71C10.58 6.13 11.27 6 12 6Z"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
