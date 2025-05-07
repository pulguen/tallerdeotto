// src/hooks/useAutoLogout.jsx
import { useEffect } from 'react';
import { useAuth } from '../context/useAuth';

export default function useAutoLogout(timeout = 15 * 60 * 1000) {
  const { logout } = useAuth();

  useEffect(() => {
    let timerId;

    const resetTimer = () => {
      clearTimeout(timerId);
      timerId = setTimeout(logout, timeout);
    };

    // Eventos que indican “actividad”
    const events = ['load','mousemove','mousedown','click','scroll','keypress'];

    events.forEach(evt => window.addEventListener(evt, resetTimer));
    resetTimer(); // arrancamos el contador

    return () => {
      clearTimeout(timerId);
      events.forEach(evt => window.removeEventListener(evt, resetTimer));
    };
  }, [logout, timeout]);
}