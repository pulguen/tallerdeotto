import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuth';
import ProtectedLayout from './common/Layout/ProtectedLayout/ProtectedLayout';

import Login    from './features/Users/Login';
import Register from './features/Users/Register';
import Home     from './features/Home/Home';
import Admin    from './features/Control/ControlHome/Admin';
import Ingresos from './features/Control/Ingresos/Ingresos';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register"         element={<Register />} />
          <Route path="/"         element={<Home />} />
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
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* Si se accede a una ruta no definida, muestra una página de error o redirige */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
  );
}
