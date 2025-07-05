// AuthProvider.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './customAxios';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Cargar perfil tras refrescar token
  useEffect(() => {
    (async () => {
      try {
        const { data: tokenData } = await axios.post(
          'users/token/refresh/',
          {},
          { skipAuth: true }
        );
        window.accessToken = tokenData.access;

        // 🔁 Traer perfil real con grupos
        const { data: profile } = await axios.get('users/me/');
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🚀 Login: obtener token + perfil
  const login = useCallback(async (username, password) => {
    const { data: tokenData } = await axios.post(
      'users/token/',
      { username, password },
      { skipAuth: true }
    );
    window.accessToken = tokenData.access;

    // 🔁 Traer perfil real con grupos
    const { data: profile } = await axios.get('users/me/');
    setUser(profile);

    navigate('/admin');
  }, [navigate]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await axios.post('users/token/blacklist/', {}, { skipAuth: true });
    } catch {
      /* ignore */
    }
    window.accessToken = null;
    setUser(null);
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
