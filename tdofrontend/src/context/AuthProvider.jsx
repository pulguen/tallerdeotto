import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './customAxios';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh token on mount
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          'users/token/refresh/',
          {},
          { skipAuth: true }
        );
        window.accessToken = data.access;
        setUser({}); // podrías fetchear /users/me/ aquí
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (username, password) => {
    const { data } = await axios.post(
      'users/token/',
      { username, password },
      { skipAuth: true }
    );
    window.accessToken = data.access;
    setUser({ username });
    navigate('/admin');
  }, [navigate]);

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
