// src/components/product/ProductPrice.jsx
import React from "react";
import { formatPrice } from "../../utils/formatPrice";

/**
 * Product price display with original price strikethrough
 * @param {number} price - Current/discounted price
 * @param {number} [originalPrice] - Before discount
 * @param {number} [discountPercentage]
 * @param {"sm"|"md"|"lg"} [size]
 */
const ProductPrice = ({
  price,
  originalPrice,
  discountPercentage,
  size = "sm",
}) => {
  const sizes = {
    sm: { current: "text-[13px] sm:text-[14px]", original: "text-[11px] sm:text-[12px]" },
    md: { current: "text-[16px] sm:text-[18px]", original: "text-[13px] sm:text-[14px]" },
    lg: { current: "text-[24px] sm:text-[28px]", original: "text-[16px] sm:text-[18px]" },
  };

  const s = sizes[size] || sizes.sm;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`font-pub font-semibold text-[#2DA5F3] ${s.current}`}>
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <del className={`font-pub font-normal text-[#929FA5] ${s.original}`}>
          {formatPrice(originalPrice)}
        </del>
      )}
    </div>
  );
};

export default ProductPrice;
