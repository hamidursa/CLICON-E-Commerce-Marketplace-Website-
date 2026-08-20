// src/utils/formatPrice.js

/**
 * Format a number as USD currency
 * @param {number} price
 * @returns {string}  e.g. "$1,299.00"
 */
export const formatPrice = (price) => {
  if (price == null) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Calculate discounted price
 * @param {number} price - Original price
 * @param {number} discountPercentage
 * @returns {number}
 */
export const getDiscountedPrice = (price, discountPercentage) => {
  if (!discountPercentage) return price;
  return price * (1 - discountPercentage / 100);
};
