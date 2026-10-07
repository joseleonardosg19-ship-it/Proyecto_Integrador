import { Link } from "react-router-dom";
import { formatearPrecio } from "../../utils/formatters";

export default function ProductCard({ producto }) {
  const sinStock = producto.stock === 0;

  return (
    <Link className="product-card" to={`/productos/${producto.id}`}>
      <div className="product-imagen">{producto.imagen}</div>
      <div className="product-main">
        <span className="product-categoria">{producto.categoria}</span>
        <h3>{producto.nombre}</h3>
        <p className="product-precio">{formatearPrecio(producto.precio)}</p>
        {sinStock && <span className="badge-agotado">Agotado</span>}
      </div>
    </Link>
  );
}