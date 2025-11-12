// src/features/Users/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (err) {
      // mensaje empático para cliente
      const msg =
        err?.message === 'Invalid credentials'
          ? 'Revisá tus datos. Usuario/email o contraseña no coinciden.'
          : (err?.message || 'No pudimos iniciar sesión. Probá de nuevo en unos segundos.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card shadow p-4 rounded-4 bg-white">
        {/* LOGO */}
        <div className="text-center mb-3">
          <a href="/" aria-label="Ir al inicio">
            <img
              src="/logoHome.png"
              alt="Taller de Otto"
              className="brand-logo"
              width="220"
              height="64"
              decoding="async"
            />
          </a>
        </div>

        <h2 className="text-center mb-2 fw-semibold text-dark">Entrá a tu cuenta</h2>
        <p className="text-center text-muted mb-4 small">
          Seguimiento de pedidos, mensajes y presupuestos en un solo lugar.
        </p>

        {error && (
          <div className="alert alert-danger py-2 text-center small" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label mb-1">Usuario o email</label>
            <input
              type="text"
              placeholder="tu_usuario o tu@email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
              disabled={loading}
              autoComplete="username"
              aria-label="Usuario o email"
            />
          </div>

          <div>
            <label className="form-label mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
              disabled={loading}
              autoComplete="current-password"
              aria-label="Contraseña"
            />
            <small className="text-muted d-block mt-1">
              ¿La olvidaste?{" "}
              <Link to="/forgot-password" className="link-primary">
                Recuperala acá
              </Link>
              .
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading}
            aria-label="Entrar"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>

          <p className="text-center small mt-3 mb-0">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="link-primary text-decoration-none fw-semibold">
              Registrate gratis
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
