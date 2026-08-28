// src/utils/filterProducts.js
import { products } from "../data/products";

/**
 * Filter products by multiple criteria
 * @param {Object} filters
 * @param {string} filters.search - Search query (name, brand, category, tags)
 * @param {string} filters.category - Category slug
 * @param {string[]} filters.brands - Selected brand names
 * @param {number[]} filters.priceRange - [min, max]
 * @param {number} filters.minRating - Minimum star rating
 * @param {boolean} filters.inStockOnly - Only show in-stock items
 * @returns {Array}
 */
export const filterProducts = (allProducts, filters = {}) => {
  const {
    search = "",
    category = "",
    brands = [],
    priceRange = [0, 10000],
    minRating = 0,
    inStockOnly = false,
  } = filters;

  return allProducts.filter((product) => {
    // Search filter: match name, brand, category, or tags
    if (search) {
      const q = search.toLowerCase();
      const matchesName = product.name?.toLowerCase().includes(q);
      const matchesBrand = product.brand?.toLowerCase().includes(q);
      const matchesCategory = product.category?.toLowerCase().includes(q);
      const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchesName && !matchesBrand && !matchesCategory && !matchesTags) {
        return false;
      }
    }

    // Category filter
    if (category && product.category !== category) return false;

    // Brand filter
    if (brands.length > 0 && !brands.includes(product.brand)) return false;

    // Price filter
    const [min, max] = priceRange;
    if (product.price < min || product.price > max) return false;

    // Rating filter
    if (minRating > 0 && product.rating < minRating) return false;

    // Stock filter
    if (inStockOnly && product.stock <= 0) return false;

    return true;
  });
};
