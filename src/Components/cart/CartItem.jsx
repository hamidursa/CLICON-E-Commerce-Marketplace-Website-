import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import QuantitySelector from "./QuantitySelector";
import { formatPrice } from "../../utils/formatPrice";

/**
 * Reusable Cart Item Row (used in Cart Page and Cart Drawer)
 * @param {Object} item - cart item
 * @param {Function} onUpdateQuantity
 * @param {Function} onRemove
 * @param {"table"|"compact"} variant
 */
const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  variant = "table",
}) => {
  const lineTotal = item.price * item.quantity;

  if (variant === "compact") {
    return (
      <div className="flex items-start gap-3 py-3 border-b border-[#E4E7E9]">
        <img
          src={item.thumbnail || item.images?.[0]}
          alt={item.name || item.title}
          className="w-16 h-16 object-contain bg-[#F8F9FA] p-1 rounded shrink-0 border border-[#E4E7E9]"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <Link
              to={`/product/${item.id}`}
              className="text-xs font-pub font-medium text-[#191C1F] hover:text-[#2DA5F3] line-clamp-1"
            >
              {item.name || item.title}
            </Link>
            <button
              onClick={() => onRemove(item.id)}
              className="text-[#929FA5] hover:text-red-500 p-0.5"
              aria-label="Remove item"
            >
              <IoClose size={16} />
            </button>
          </div>

          <p className="text-xs text-[#77878F] mt-0.5">{item.brand}</p>

          <div className="flex items-center justify-between mt-2">
            <QuantitySelector
              value={item.quantity}
              onChange={(q) => onUpdateQuantity(item.id, q)}
              size="sm"
            />
            <span className="text-xs font-pub font-bold text-[#2DA5F3]">
              {formatPrice(lineTotal)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Table row layout for desktop
  return (
    <tr className="border-b border-[#E4E7E9] hover:bg-[#F9F9F9] transition-colors">
      <td className="py-4 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onRemove(item.id)}
            className="w-6 h-6 rounded-full border border-[#929FA5] text-[#929FA5] hover:border-red-500 hover:text-red-500 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Remove product"
          >
            <IoClose size={14} />
          </button>

          <Link
            to={`/product/${item.id}`}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F8F9FA] rounded p-1 border border-[#E4E7E9] shrink-0 flex items-center justify-center"
          >
            <img
              src={item.thumbnail || item.images?.[0]}
              alt={item.name || item.title}
              className="max-h-full max-w-full object-contain"
            />
          </Link>

          <div>
            <Link
              to={`/product/${item.id}`}
              className="font-pub font-medium text-sm sm:text-base text-[#191C1F] hover:text-[#2DA5F3] line-clamp-1"
            >
              {item.name || item.title}
            </Link>
            {item.brand && (
              <span className="text-xs text-[#77878F] font-pub block mt-0.5">
                {item.brand}
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="py-4 px-4 sm:px-6 text-sm font-pub font-semibold text-[#FA8232]">
        {formatPrice(item.price)}
      </td>

      <td className="py-4 px-4 sm:px-6">
        <QuantitySelector
          value={item.quantity}
          onChange={(q) => onUpdateQuantity(item.id, q)}
          size="md"
        />
      </td>

      <td className="py-4 px-4 sm:px-6 text-sm sm:text-base font-pub font-bold text-[#2DA5F3]">
        {formatPrice(lineTotal)}
      </td>
    </tr>
  );
};

export default CartItem;
