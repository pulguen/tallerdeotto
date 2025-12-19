// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './context/useAuth';
import ProtectedLayout from './common/Layout/ProtectedLayout/ProtectedLayout';

import Login from './features/Users/Login';
import Register from './features/Users/Register';
import Home from './features/Home/Home';

import Admin from './features/Control/ControlHome/Admin';
import Ingresos from './features/Control/Ingresos/Ingresos';
import GastosHome from './features/Control/Gastos/GastosHome';

// Servicios Destacados
import DisenoGrafico from './features/Home/ServiciosDestacados/DiseñoGrafico/DiseñoGrafico';
import SocialMedia from './features/Home/ServiciosDestacados/SocialMedia/SocialMedia';
import DiseñoWeb from './features/Home/ServiciosDestacados/DiseñoWeb/DiseñoWeb';
import DesarrolloSoftware from './features/Home/ServiciosDestacados/DesarrolloSoftware/DesarrolloSoftware';
import Impresiones from './features/Home/ServiciosDestacados/Impresiones/Impresiones';

// Estampado (hub + subservicios)
import Estampado from './features/Home/ServiciosDestacados/Estampado/Estampado';
import Serigrafia from './features/Home/ServiciosDestacados/Estampado/Serigrafia';
import Vinilo from './features/Home/ServiciosDestacados/Estampado/Vinilo';
import DTF from './features/Home/ServiciosDestacados/Estampado/DTF/';
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

export default function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />

      {/* Servicios públicos */}
      <Route path="/servicios/diseño-grafico" element={<DisenoGrafico />} />
      <Route path="/servicios/social-media" element={<SocialMedia />} />
      <Route path="/servicios/diseño-web" element={<DiseñoWeb />} />
      <Route path="/servicios/desarrollo-software" element={<DesarrolloSoftware />} />
      <Route path="/servicios/estampado" element={<Estampado />} />
      <Route path="/servicios/estampado/serigrafia" element={<Serigrafia />} />
      <Route path="/servicios/estampado/vinilo" element={<Vinilo />} />
      <Route path="/servicios/estampado/dtf  " element={<DTF />} />
      <Route path="/servicios/impresiones-profesionales" element={<Impresiones />} />
      

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
