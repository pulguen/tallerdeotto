// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import AuthProvider from './context/AuthProvider';
import useAutoLogout from './hooks/useAutoLogout';
import App from './App.jsx';
import './index.css';
import GlobalLayout from './common/Layout/GlobalLayout/GlobalLayout.jsx';


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
      <GlobalLayout>    
        <Root />
        </GlobalLayout>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
