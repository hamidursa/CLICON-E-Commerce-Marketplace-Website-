// src/components/common/Badge.jsx
import React from "react";

/**
 * Product Badge component
 * @param {"discount"|"new"|"trending"|"hot"|"out-of-stock"|"featured"} type
 * @param {string|number} [value] - For discount badge, the percentage value
 */
const Badge = ({ type, value, className = "" }) => {
  const base =
    "inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-pub font-bold leading-none rounded-sm";

  const styles = {
    discount: `bg-[#FA8232] text-white ${base}`,
    new: `bg-[#2DA5F3] text-white ${base}`,
    trending: `bg-[#EBC80C] text-[#191C1F] ${base}`,
    hot: `bg-red-500 text-white ${base}`,
    "out-of-stock": `bg-[#E4E7E9] text-[#77878F] ${base}`,
    featured: `bg-[#191C1F] text-white ${base}`,
  };

  const labels = {
    new: "NEW",
    trending: "HOT",
    hot: "HOT",
    featured: "FEATURED",
    "out-of-stock": "OUT OF STOCK",
  };

  if (type === "discount" && value) {
    return (
      <span className={`${styles.discount} ${className}`}>-{value}%</span>
    );
  }

  return (
    <span className={`${styles[type] || styles.new} ${className}`}>
      {labels[type] || type.toUpperCase()}
    </span>
  );
};

export default Badge;
