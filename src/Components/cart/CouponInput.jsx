import React, { useState } from "react";

/**
 * Coupon Code input with discount validation
 * @param {Function} onApply - callback receiving applied discount percentage (e.g. 5, 10)
 * @param {boolean} applied - is a coupon already applied
 * @param {Function} onRemove - callback to remove coupon
 */
const CouponInput = ({ onApply, applied = false, onRemove }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);

  // Predefined coupon promo codes
  const validCoupons = {
    YS143: 5,
    CLICON10: 10,
    SUMMER20: 20,
  };

  const handleApply = (e) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) return;

    if (validCoupons[clean]) {
      const discount = validCoupons[clean];
      onApply(discount, clean);
      setMessage({
        type: "success",
        text: `Coupon "${clean}" applied! You saved ${discount}%.`,
      });
    } else {
      setMessage({
        type: "error",
        text: "Invalid coupon code. Try 'CLICON10' or 'YS143'.",
      });
    }
  };

  const handleRemove = () => {
    onRemove && onRemove();
    setCode("");
    setMessage(null);
  };

  return (
    <div className="border border-[#E4E7E9] rounded-md p-5 sm:p-6 bg-white shadow-2xs">
      <h3 className="font-pub font-semibold text-base sm:text-lg text-[#191C1F] mb-4">
        Coupon Code
      </h3>

      {applied ? (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-sm">
          <span className="text-xs font-pub font-medium text-emerald-800">
            Coupon applied successfully!
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs font-pub font-bold text-red-600 hover:underline cursor-pointer"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex flex-col gap-3">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setMessage(null);
            }}
            placeholder="e.g. CLICON10 or YS143"
            className="w-full border border-[#E4E7E9] rounded-sm px-4 py-2.5 text-sm font-pub outline-none focus:border-[#2DA5F3]"
          />
          <button
            type="submit"
            className="w-full bg-[#2DA5F3] hover:bg-[#1b8fd8] text-white font-pub font-bold text-sm py-2.5 rounded-sm transition-colors cursor-pointer"
          >
            Apply Coupon
          </button>
        </form>
      )}

      {message && (
        <p
          className={`mt-3 text-xs font-pub font-medium ${
            message.type === "success" ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default CouponInput;
