// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from './context/AuthProvider';
import useAutoLogout from './hooks/useAutoLogout';
import App from './App.jsx';
import './index.css';

/* eslint-disable react-refresh/only-export-components */

function Root() {
  // Auto-logout tras 15 minutos de inactividad
  useAutoLogout(15 * 60 * 1000);
  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
