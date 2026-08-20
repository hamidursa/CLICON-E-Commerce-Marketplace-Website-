// src/components/common/LoadingSpinner.jsx
import React from "react";

/**
 * Loading skeleton for product grids
 * @param {number} count - Number of skeleton cards to show
 */
export const ProductCardSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-[#E4E7E9] rounded-sm p-4 animate-pulse"
        >
          <div className="h-44 bg-[#F2F4F5] rounded-sm mb-4" />
          <div className="h-3 bg-[#F2F4F5] rounded w-3/4 mb-2" />
          <div className="h-3 bg-[#F2F4F5] rounded w-1/2 mb-3" />
          <div className="h-4 bg-[#F2F4F5] rounded w-1/3" />
        </div>
      ))}
    </>
  );
};

/**
 * Full page loading spinner
 */
const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="w-10 h-10 border-4 border-[#E4E7E9] border-t-[#FA8232] rounded-full animate-spin" />
      <p className="font-pub text-[14px] text-[#77878F]">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
