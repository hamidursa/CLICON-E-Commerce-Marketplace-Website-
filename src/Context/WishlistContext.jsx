// src/context/WishlistContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("clicon_wishlist");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("clicon_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((item) => {
    if (!item) return;
    setWishlist((prev) => {
      const exists = !!prev[item.id];
      if (exists) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return { ...prev, [item.id]: item };
    });
  }, []);

  const addToWishlist = useCallback((item) => {
    setWishlist((prev) => ({ ...prev, [item.id]: item }));
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }, []);

  const isWishlisted = useCallback(
    (id) => !!wishlist[id],
    [wishlist]
  );

  const wishlistCount = Object.keys(wishlist).length;
  const wishlistItems = Object.values(wishlist);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};

export default WishlistProvider;
