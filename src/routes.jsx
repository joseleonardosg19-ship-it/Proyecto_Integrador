import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Productos from "./pages/Productos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { DemoAuthProvider } from "./context/DemoAuthContext.jsx";
import Carrito from "./pages/Carrito.jsx";
import Acceso from "./pages/Acceso.jsx";
import ResumenCompra from "./pages/ResumenCompra.jsx";

export default function AppRoutes() {
  return (
    <ThemeProvider>
      <CartProvider>
        <DemoAuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Productos />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<ProductoDetalle />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/acceso" element={<Acceso />} />
              <Route path="/resumen" element={<ResumenCompra />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </DemoAuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}