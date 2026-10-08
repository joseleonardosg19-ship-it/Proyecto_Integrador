import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../services/mockApi";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import usePageTitle from "../hooks/usePageTitle";
import "./Home.css";

const CATEGORIAS = [
  { nombre: "Tenis", icono: "👟" },
  { nombre: "Gorras", icono: "🧢" },
  { nombre: "Camisetas", icono: "👕" },
  { nombre: "Hoodies", icono: "🧥" },
  { nombre: "Accesorios", icono: "🎒" }
];

/**
 * Reemplaza index.html + el script inline (initHome). El buscador
 * del topbar ahora vive en <Navbar showSearch /> (ver AppRoutes),
 * que redirige a /productos?buscar=... igual que antes.
 */
export default function Home() {
  usePageTitle("Inicio");
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    obtenerProductos().then((productos) => {
      if (activo) {
        setDestacados(productos.slice(0, 8));
        setCargando(false);
      }
    });
    return () => {
      activo = false;
    };
  }, []);

  return (
    <>
      <section className="banner">
        <h1>Estilo urbano, sin límites</h1>
        <p>Tenis, gorras, camisetas, hoodies y accesorios para tu día a día.</p>
      </section>

      <h2 className="section-heading">Categorías</h2>
      <div className="category-grid">
        {CATEGORIAS.map((cat) => (
          <Link key={cat.nombre} className="category-pill" to={`/productos?categoria=${cat.nombre}`}>
            <span className="cat-icon">{cat.icono}</span>
            <h3>{cat.nombre}</h3>
          </Link>
        ))}
      </div>

      <h2 className="section-heading">Destacados</h2>
      {cargando ? <p className="page-message" role="status">Cargando productos...</p> : (
        <ProductGrid productos={destacados} emptyMessage="No hay productos disponibles." />
      )}
    </>
  );
}