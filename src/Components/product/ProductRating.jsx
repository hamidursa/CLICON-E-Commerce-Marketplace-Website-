// src/components/product/ProductRating.jsx
import React from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

/**
 * Star rating display
 * @param {number} rating - 0 to 5
 * @param {number} [reviewCount]
 * @param {"sm"|"md"|"lg"} [size]
 * @param {boolean} [showCount]
 */
const ProductRating = ({ rating = 0, reviewCount, size = "sm", showCount = true }) => {
  const sizes = { sm: "text-[12px]", md: "text-[14px]", lg: "text-[16px]" };
  const countSizes = { sm: "text-[11px]", md: "text-[12px]", lg: "text-[13px]" };

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return "full";
    if (i < rating) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center gap-0.5 ${sizes[size]} text-[#FA8232]`}>
        {stars.map((star, i) => (
          <span key={i}>
            {star === "full" && <IoStar />}
            {star === "half" && <IoStarHalf />}
            {star === "empty" && <IoStarOutline />}
          </span>
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={`${countSizes[size]} text-[#77878F] font-int`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
      {showCount && reviewCount === undefined && rating > 0 && (
        <span className={`${countSizes[size]} text-[#77878F] font-int`}>
          ({rating})
        </span>
      )}
    </div>
  );
};

export default ProductRating;
