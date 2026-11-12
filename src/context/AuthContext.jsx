import { createContext, useContext, useState } from "react";
import { iniciarSesion, registrarUsuario } from "../services/authService.js";

const USER_KEY = "tienda-creativa-user";
const AuthContext = createContext(null);

function readSavedUser() {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

// Solo se conservan datos de perfil: nunca la contraseña.
function toSessionUser({ id, nombre, email, rol }) {
  return { id, nombre, email, rol };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSavedUser);

  function saveUser(nextUser) {
    setUser(nextUser);
    try {
      if (nextUser) {
        sessionStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      } else {
        sessionStorage.removeItem(USER_KEY);
      }
    } catch {
      // Sin almacenamiento disponible: la sesión dura mientras la página siga abierta.
    }
  }

  async function signIn(email, password) {
    const account = await iniciarSesion(email.trim().toLowerCase(), password);
    saveUser(toSessionUser(account));
  }

  async function register({ nombre, email, password }) {
    const account = await registrarUsuario({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
    saveUser(toSessionUser(account));
  }

  function signOut() {
    saveUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  }
  return context;
}
