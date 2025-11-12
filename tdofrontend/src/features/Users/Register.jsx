import React, { useMemo, useState } from "react";
import axios from "../../context/customAxios";
import { usePasswordValidation } from "../../hooks/usePasswordValidations.js";
import "./auth.css"; // estilos compartidos login/register

export default function Register() {
  const [username, setUsername] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [accept,   setAccept]   = useState(false);

  const [error,  setError]  = useState("");
  const [okMsg,  setOkMsg]  = useState("");
  const [loading,setLoading]= useState(false);

  const {
    lengthValid,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial,
    notNumericOnly,
    isValid,
  } = usePasswordValidation(password);

  const passwordsMatch = confirm.length === 0 ? true : password === confirm;

  const checksPassed = [lengthValid, hasUpper, hasLower, hasNumber, hasSpecial, notNumericOnly].filter(Boolean).length;
  const strength = useMemo(() => Math.round((checksPassed / 6) * 100), [checksPassed]);

  const strengthVariant =
    strength < 40 ? "bg-danger" : strength < 70 ? "bg-warning" : "bg-success";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOkMsg("");

    if (!isValid)         return setError("La contraseña no cumple los requisitos.");
    if (!passwordsMatch)  return setError("Las contraseñas no coinciden.");
    if (!accept)          return setError("Debés aceptar los términos y condiciones.");

    setLoading(true);
    try {
      await axios.post("users/register/", { username, email, password });
      setOkMsg("¡Listo! Cuenta creada. Ya podés iniciar sesión.");
      setUsername(""); setEmail(""); setPassword(""); setConfirm(""); setAccept(false);
    } catch (err) {
      const apiMsg = err?.response?.data?.detail || err?.response?.data?.message;
      setError(apiMsg || err.message || "No pudimos crear la cuenta. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
      <div className="auth-card shadow p-4 rounded-4 bg-white">
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

        <h2 className="text-center mb-2 fw-semibold text-dark">Crear cuenta</h2>
        <p className="text-center text-muted mb-4 small">
          Pedí presupuestos y seguí tus pedidos desde un solo lugar.
        </p>

        {error && (
          <div className="alert alert-danger py-2 text-center small" role="alert">
            {error}
          </div>
        )}
        {okMsg && (
          <div className="alert alert-success py-2 text-center small" role="status">
            {okMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="d-flex flex-column gap-3">
          {/* Usuario */}
          <div>
            <label className="form-label mb-1">Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Elegí un nombre para tu cuenta"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div>
            <label className="form-label mb-1">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Te escribimos acá para confirmarte avances"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="form-label mb-1">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mínimo 10 caracteres (letras, números y símbolo)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              disabled={loading}
            />
          </div>

          {/* Confirmación */}
          <div>
            <label className="form-label mb-1">Confirmar contraseña</label>
            <input
              type="password"
              className={`form-control ${confirm && !passwordsMatch ? "is-invalid" : ""}`}
              placeholder="Repetí tu contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
              disabled={loading}
            />
            <div className="invalid-feedback">Las contraseñas no coinciden.</div>
          </div>

          {/* Barra de fuerza (Bootstrap Progress) */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <small className="text-muted">Seguridad de contraseña</small>
              <small className="text-muted">
                {strength < 40 ? "Débil" : strength < 70 ? "Media" : "Fuerte"}
              </small>
            </div>
            <div className="progress strength-progress">
              <div
                className={`progress-bar ${strengthVariant}`}
                role="progressbar"
                style={{ width: `${strength}%` }}
                aria-valuenow={strength}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            {/* Checklist compacto */}
            <ul className="small text-muted mt-2 row g-1 checklist">
              <li className={`col-12 col-sm-6 ${lengthValid ? "text-success" : ""}`}>• 10+ caracteres</li>
              <li className={`col-12 col-sm-6 ${hasUpper ? "text-success" : ""}`}>• 1 mayúscula</li>
              <li className={`col-12 col-sm-6 ${hasLower ? "text-success" : ""}`}>• 1 minúscula</li>
              <li className={`col-12 col-sm-6 ${hasNumber ? "text-success" : ""}`}>• 1 número</li>
              <li className={`col-12 col-sm-6 ${hasSpecial ? "text-success" : ""}`}>• 1 símbolo (@$!%*?&)</li>
              <li className={`col-12 col-sm-6 ${notNumericOnly ? "text-success" : ""}`}>• No solo números</li>
            </ul>
          </div>

          {/* Términos */}
          <div className="form-check mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              id="terms"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
              disabled={loading}
              required
            />
            <label className="form-check-label" htmlFor="terms">
              Acepto los <a href="/terminos" className="link-primary">términos</a> y la{" "}
              <a href="/privacidad" className="link-primary">política de privacidad</a>.
            </label>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
            disabled={loading || !isValid || !passwordsMatch || !accept}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Creando cuenta…
              </>
            ) : (
              "Registrarme"
            )}
          </button>

          <p className="text-center small mt-2 mb-0">
            ¿Ya tenés cuenta?{" "}
            <a href="/login" className="link-primary fw-semibold text-decoration-none">
              Iniciá sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
