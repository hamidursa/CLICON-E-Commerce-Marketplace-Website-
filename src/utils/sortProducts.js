// src/utils/sortProducts.js

/**
 * Sort an array of products by a given sort key
 * @param {Array} products
 * @param {string} sortBy - "featured" | "price-asc" | "price-desc" | "rating" | "newest" | "discount"
 * @returns {Array}
 */
export const sortProducts = (products, sortBy = "featured") => {
  const list = [...products];

  switch (sortBy) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);

    case "price-desc":
      return list.sort((a, b) => b.price - a.price);

    case "rating":
      return list.sort((a, b) => b.rating - a.rating);

    case "newest":
      return list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));

    case "discount":
      return list.sort(
        (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)
      );

    case "featured":
    default:
      return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
};

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Best Discount" },
];
