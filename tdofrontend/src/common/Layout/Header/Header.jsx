import React from 'react';
import { useAuth } from '../../../context/useAuth';

export default function Header() {
  const { user, logout, loading } = useAuth();

  if (loading || !user) return null;

  return (
    <header className="flex justify-between items-center p-4 bg-gray-50 shadow">
      <h1 className="text-xl font-semibold">Taller de Otto</h1>
      <button
        onClick={logout}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
