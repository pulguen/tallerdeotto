// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAuth } from './context/useAuth';
import ProtectedLayout from './common/Layout/ProtectedLayout/ProtectedLayout';

import Login      from './features/Users/Login';
import Register   from './features/Users/Register';
import Home       from './features/Home/Home';
import Admin      from './features/Control/ControlHome/Admin';
import Ingresos   from './features/Control/Ingresos/Ingresos';
import GastosHome from './features/Control/Gastos/GastosHome';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#e5edf3' }}>
        Cargando...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

import { Navigate } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/"         element={<Home />} />

      {/* Admin / Control */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <Admin />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/ingresos"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <Ingresos />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/gastos"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <GastosHome />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div style={{ padding: '2rem', color: '#e5edf3' }}>
            404 Not Found
          </div>
        }
      />
    </Routes>
  );
}
