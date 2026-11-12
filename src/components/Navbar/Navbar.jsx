import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleBuscar(e) {
    if (e.key === "Enter") {
      const search = e.currentTarget.value.trim();
      navigate(search ? `/productos?buscar=${encodeURIComponent(search)}` : "/productos");
    }
  }

  return (
    <header className="site-header">
      <nav className="topbar" aria-label="Navegación principal">
        <Link className="logo-text" to="/" aria-label="Tienda Creativa, ir al inicio">
          Tienda <span className="logo-accent">Creativa</span>
        </Link>
        <div className="topbar-search">
          <input
            type="text"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            onKeyDown={handleBuscar}
          />
        </div>
        <div className="nav-actions">
          <NavLink to="/" end className="nav-link">Inicio</NavLink>
          <NavLink to="/productos" className="nav-link">Productos</NavLink>
          <NavLink to="/analisis" className="nav-link">Análisis</NavLink>
          <NavLink to="/carrito" className="nav-link cart-nav-link">
            Carrito{itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </NavLink>
          {user ? (
            <>
              <span className="nav-user">Hola, {user.nombre}</span>
              <button className="nav-link" type="button" onClick={signOut}>Salir</button>
            </>
          ) : (
            <NavLink to="/acceso" className="nav-link">Ingresar</NavLink>
          )}
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
            aria-pressed={theme === "dark"}
            title={`Tema ${theme === "light" ? "oscuro" : "claro"}`}
          >
            <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
