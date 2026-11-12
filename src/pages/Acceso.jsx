import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import usePageTitle from "../hooks/usePageTitle.js";
import "./Acceso.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const MAX_NAME_LENGTH = 50;
const RETURN_TO = "/resumen";

export default function Acceso() {
  usePageTitle("Acceso");
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, register } = useAuth();
  const navigate = useNavigate();

  function validate() {
    if (isRegistering && !nombre.trim()) return "Ingresa tu nombre.";
    if (isRegistering && nombre.trim().length > MAX_NAME_LENGTH) {
      return `El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres.`;
    }
    if (!email.trim() || !password) return "Completa el correo electrónico y la contraseña.";
    if (!EMAIL_PATTERN.test(email.trim())) return "Ingresa un correo electrónico válido.";
    if (isRegistering) {
      if (password.length < MIN_PASSWORD_LENGTH) {
        return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
      }
      if (password !== confirmation) return "Las contraseñas no coinciden.";
    }
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      if (isRegistering) {
        await register({ nombre, email, password });
      } else {
        await signIn(email, password);
      }
      navigate(RETURN_TO, { replace: true });
    } catch (requestError) {
      setError(requestError.message);
      setSubmitting(false);
    }
  }

  function toggleMode() {
    setIsRegistering((current) => !current);
    setError("");
  }

  return (
    <section className="auth-page">
      <div className="commerce-heading">
        <p className="commerce-eyebrow">Tu cuenta</p>
        <h1>{isRegistering ? "Crear cuenta" : "Iniciar sesión"}</h1>
      </div>

      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {isRegistering && (
            <>
              <label htmlFor="auth-nombre">Nombre</label>
              <input
                id="auth-nombre"
                type="text"
                autoComplete="name"
                maxLength={MAX_NAME_LENGTH}
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="auth-email">Correo electrónico</label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="auth-password">Contraseña</label>
          <input
            id="auth-password"
            type="password"
            autoComplete={isRegistering ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {isRegistering && (
            <>
              <label htmlFor="auth-confirmation">Confirmar contraseña</label>
              <input
                id="auth-confirmation"
                type="password"
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                required
              />
            </>
          )}

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="commerce-button auth-submit" type="submit" disabled={submitting}>
            {submitting
              ? "Procesando..."
              : isRegistering ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </form>

        <button className="auth-mode-toggle" type="button" onClick={toggleMode}>
          {isRegistering ? "Ya tengo una cuenta: iniciar sesión" : "Crear una cuenta"}
        </button>

        <div className="auth-links">
          <Link to="/carrito">Volver al carrito</Link>
          <Link to="/productos">Seguir comprando</Link>
        </div>
      </div>
    </section>
  );
}
