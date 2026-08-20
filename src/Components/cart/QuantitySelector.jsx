import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

/**
 * Reusable Quantity Selector component
 * @param {number} value - current quantity
 * @param {Function} onChange - handler receiving new quantity number
 * @param {number} min - minimum allowed quantity
 * @param {number} max - maximum allowed quantity
 * @param {"sm"|"md"|"lg"} size
 */
const QuantitySelector = ({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className = "",
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    const parsed = parseInt(e.target.value, 10);
    if (isNaN(parsed)) {
      onChange(min);
    } else {
      const clamped = Math.min(Math.max(parsed, min), max);
      onChange(clamped);
    }
  };

  const sizeClasses = {
    sm: "h-8 text-xs",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  const btnWidth = {
    sm: "w-8",
    md: "w-10",
    lg: "w-12",
  };

  const inputWidth = {
    sm: "w-10",
    md: "w-12",
    lg: "w-16",
  };

  return (
    <div
      className={`inline-flex items-center border border-[#E4E7E9] rounded-sm bg-white overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className={`${btnWidth[size]} h-full flex items-center justify-center text-[#475156] hover:bg-[#F2F4F5] hover:text-[#FA8232] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer`}
        aria-label="Decrease quantity"
      >
        <FiMinus size={size === "sm" ? 12 : 14} />
      </button>

      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className={`${inputWidth[size]} h-full text-center border-x border-[#E4E7E9] font-pub font-semibold text-[#191C1F] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        aria-label="Quantity"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className={`${btnWidth[size]} h-full flex items-center justify-center text-[#475156] hover:bg-[#F2F4F5] hover:text-[#FA8232] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer`}
        aria-label="Increase quantity"
      >
        <FiPlus size={size === "sm" ? 12 : 14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
