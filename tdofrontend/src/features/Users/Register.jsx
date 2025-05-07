// src/features/Users/Register.jsx
import React, { useState } from 'react';
import axios from '../../context/customAxios';
import { usePasswordValidation } from '../../hooks/usePasswordValidations.js';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState(false);

  const {
    lengthValid,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial,
    notNumericOnly,
    isValid
  } = usePasswordValidation(password);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!isValid) {
      setError('La contraseña no cumple todos los requisitos.');
      return;
    }
    try {
      await axios.post('users/register/', { username, email, password });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  if (success) {
    return <div className="p-4 bg-green-100 text-green-800">Registro exitoso. Por favor inicia sesión.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <div className="space-y-2">
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <ul className="text-sm space-y-1">
          <li className={lengthValid ? 'text-green-600' : 'text-red-600'}>
            • Mínimo 10 caracteres
          </li>
          <li className={hasUpper ? 'text-green-600' : 'text-red-600'}>
            • Al menos 1 letra mayúscula
          </li>
          <li className={hasLower ? 'text-green-600' : 'text-red-600'}>
            • Al menos 1 letra minúscula
          </li>
          <li className={hasNumber ? 'text-green-600' : 'text-red-600'}>
            • Al menos 1 dígito
          </li>
          <li className={hasSpecial ? 'text-green-600' : 'text-red-600'}>
            • Al menos 1 carácter especial (@$!%*?&)
          </li>
          <li className={notNumericOnly ? 'text-green-600' : 'text-red-600'}>
            • No puede ser solo números
          </li>
        </ul>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full p-2 rounded text-white ${
          isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Registrarse
      </button>
    </form>
  );
}
