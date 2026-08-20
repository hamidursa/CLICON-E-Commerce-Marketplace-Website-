import { createContext, useEffect, useState } from "react";
import { products } from "../data/products";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [product] = useState(products);

  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("clicon_cart") || localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("clicon_cart", JSON.stringify(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      return exists
        ? prev.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  // Favorites (persisted)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored =
        localStorage.getItem("clicon_wishlist") ||
        localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("clicon_wishlist", JSON.stringify(favorites));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    setFavorites((prev) => ({ ...prev, [item.id]: item }));
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const toggleFavorite = (item) => {
    if (!item) return;
    setFavorites((prev) => {
      const exists = !!prev[item.id];
      if (exists) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return { ...prev, [item.id]: item };
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;