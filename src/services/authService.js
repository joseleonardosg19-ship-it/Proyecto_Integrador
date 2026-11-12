import apiClient from "./apiClient.js";

// El backend gratuito de Render tarda en "despertar" tras un periodo de inactividad:
// con el timeout general (8 s) el registro se cortaba en el navegador aunque el servidor
// lo terminara procesando. Solo para autenticación se amplía el tiempo de espera.
const AUTH_TIMEOUT_MS = 45000;

function mensajeDeError(error, porDefecto) {
  const data = error.response?.data;
  if (data?.errores) return Object.values(data.errores).join(" ");
  if (typeof data?.error === "string") return data.error;
  if (!error.response) {
    return "No se pudo conectar con el servidor. Inténtalo de nuevo en unos segundos.";
  }
  return porDefecto;
}

// POST /api/auth/registro: crea el usuario en la base de datos (Neon).
export async function registrarUsuario({ nombre, email, password }) {
  try {
    const { data } = await apiClient.post(
      "/api/auth/registro",
      { nombre, email, password },
      { timeout: AUTH_TIMEOUT_MS }
    );
    return data;
  } catch (error) {
    throw new Error(mensajeDeError(error, "No se pudo crear la cuenta."));
  }
}

// POST /api/auth/login: valida las credenciales contra la base de datos.
export async function iniciarSesion(email, password) {
  try {
    const { data } = await apiClient.post(
      "/api/auth/login",
      { email, password },
      { timeout: AUTH_TIMEOUT_MS }
    );
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Correo o contraseña incorrectos.");
    }
    throw new Error(mensajeDeError(error, "No se pudo iniciar sesión."));
  }
}
