import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { mockProductos } from "../data/MockProductos.jsx";

const CART_STORAGE_KEY = "tienda-creativa-cart";
const CartContext = createContext(null);

function readCart() {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (!savedCart) return [];

  let entries;
  try {
    entries = JSON.parse(savedCart);
  } catch (error) {
    console.warn("No se pudo leer el carrito guardado; se iniciará uno vacío.", error);
    return [];
  }

  if (!Array.isArray(entries)) {
    console.warn("El carrito guardado no tiene un formato válido; se iniciará uno vacío.");
    return [];
  }

  const quantities = new Map();
  for (const entry of entries) {
    const product = mockProductos.find((item) => item.id === entry?.productId);
    if (
      !product ||
      !Number.isInteger(entry.quantity) ||
      entry.quantity < 1 ||
      product.stock < 1
    ) {
      console.warn("Se omitió un producto no válido del carrito guardado.");
      continue;
    }

    const quantity = Math.min(
      product.stock,
      (quantities.get(product.id) || 0) + entry.quantity,
    );
    quantities.set(product.id, quantity);
  }

  return [...quantities].map(([productId, quantity]) => ({ productId, quantity }));
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const items = useMemo(
    () =>
      cart.flatMap(({ productId, quantity }) => {
        const product = mockProductos.find((item) => item.id === productId);
        return product ? [{ product, quantity, subtotal: product.precio * quantity }] : [];
      }),
    [cart],
  );
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(productId, quantity = 1) {
    const product = mockProductos.find((item) => item.id === productId);
    if (!product) return "El producto seleccionado no existe en el catálogo.";
    if (!Number.isInteger(quantity) || quantity < 1) {
      return "La cantidad debe ser un número entero positivo.";
    }
    if (product.stock < 1) return "Este producto está agotado.";

    const currentQuantity = cart.find((item) => item.productId === productId)?.quantity || 0;
    if (currentQuantity + quantity > product.stock) {
      return `Solo hay ${product.stock} unidades disponibles de este producto.`;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.productId === productId);
      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...currentCart, { productId, quantity }];
    });
    return null;
  }

  function updateQuantity(productId, quantity) {
    const product = mockProductos.find((item) => item.id === productId);
    if (!product) throw new Error("El producto seleccionado no existe en el catálogo.");
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) {
      throw new Error("La cantidad debe ser un entero positivo dentro del inventario disponible.");
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.productId !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const value = {
    items,
    total,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe utilizarse dentro de CartProvider.");
  }
  return context;
}
