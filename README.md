# Tienda Creativa

Entrega enfocada exclusivamente en la estructura solicitada y el núcleo de la tienda: inicio, catálogo y detalle de producto. Usa React, Vite y React Router.

## Inventario de componentes

El inventario actual tiene 13 componentes React: las tres vistas funcionales acordadas y diez componentes de estructura o reutilización. Las tres vistas se pueden asignar una por integrante:

| Componente | Archivo | Función |
| --- | --- | --- |
| Inicio | `src/pages/Home.jsx` | Presenta categorías y productos destacados |
| Catálogo | `src/pages/Productos.jsx` | Muestra, busca, filtra y ordena productos |
| Detalle de producto | `src/pages/ProductoDetalle.jsx` | Presenta información, tallas, colores y disponibilidad |

Los siguientes componentes son la estructura mínima necesaria para que esas vistas funcionen y cumplir con los requisitos de entrega:

| Componente | Archivo | Función |
| --- | --- | --- |
| MainLayout | `src/layouts/MainLayout.jsx` | Une navegación, contenido de ruta y pie de página |
| AuthLayout | `src/layouts/AuthLayout.jsx` | Layout listo para una futura pantalla de acceso |
| ThemeProvider | `src/context/ThemeContext.jsx` | Controla y recuerda los temas claro y oscuro |
| Navbar | `src/components/Navbar/Navbar.jsx` | Navegación, búsqueda y cambio de tema |
| Footer | `src/components/Footer/Footer.jsx` | Pie de página compartido |
| Rutas | `src/routes.jsx` | Declara las tres vistas y la ruta de respaldo |
| App | `src/App.jsx` | Entrada de la aplicación |
| ProductCard | `src/components/ProductCard/ProductCard.jsx` | Enlace y resumen visual de un producto |
| ProductGrid | `src/components/ProductGrid/ProductGrid.jsx` | Presenta productos en cuadrícula |
| Loader | `src/components/Loader/Loader.jsx` | Indica la carga de un producto |

Cada vista actualiza el título de la pestaña con su nombre. El favicon está en `public/favicon.svg`. No se incluyen carrito, checkout, login ni perfil en esta entrega.

## Ejecutar y validar

```bash
npm run dev
npm run lint
npm run build
```