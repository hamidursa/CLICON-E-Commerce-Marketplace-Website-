import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "../../utils/formatPrice";

/**
 * Reusable Cart Summary totals card
 * @param {number} subtotal
 * @param {number} discountPercentage
 * @param {boolean} showCheckoutBtn
 */
const CartSummary = ({
  subtotal = 0,
  discountPercentage = 0,
  showCheckoutBtn = true,
  className = "",
}) => {
  const shipping = subtotal > 50 ? 0 : subtotal > 0 ? 10 : 0;
  const discountAmount = (subtotal * discountPercentage) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.05; // 5% standard tax
  const total = taxableAmount + shipping + tax;

  return (
    <div
      className={`border border-[#E4E7E9] rounded-md p-5 sm:p-6 bg-white shadow-2xs ${className}`}
    >
      <h3 className="font-pub font-semibold text-base sm:text-lg text-[#191C1F] mb-4 pb-3 border-b border-[#E4E7E9]">
        Order Summary
      </h3>

      <div className="flex flex-col gap-3 text-sm font-pub">
        <div className="flex items-center justify-between text-[#5F6C72]">
          <span>Subtotal</span>
          <span className="font-medium text-[#191C1F]">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[#5F6C72]">
          <span>Shipping</span>
          <span className="font-medium text-[#191C1F]">
            {shipping === 0 ? (
              <span className="text-emerald-600 font-semibold">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {discountPercentage > 0 && (
          <div className="flex items-center justify-between text-emerald-600">
            <span>Discount ({discountPercentage}%)</span>
            <span className="font-medium">-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-[#5F6C72]">
          <span>Estimated Tax (5%)</span>
          <span className="font-medium text-[#191C1F]">
            {formatPrice(tax)}
          </span>
        </div>

        <div className="border-t border-[#E4E7E9] pt-3 mt-1 flex items-center justify-between font-bold text-base sm:text-lg text-[#191C1F]">
          <span>Total</span>
          <span className="text-[#FA8232]">{formatPrice(total)}</span>
        </div>
      </div>

      {showCheckoutBtn && (
        <Link
          to="/checkout"
          className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-[#FA8232] hover:bg-[#e07228] text-white font-pub font-bold text-sm sm:text-base py-3.5 rounded-xs transition-all shadow-sm cursor-pointer"
        >
          <span>Proceed to Checkout</span>
          <FaArrowRight size={14} />
        </Link>
      )}
    </div>
  );
};

export default CartSummary;
