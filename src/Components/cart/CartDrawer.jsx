import React from "react";
import { Link } from "react-router-dom";
import { FiX, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { useCart } from "../../Context/CartContext";
import CartItem from "./CartItem";
import { formatPrice } from "../../utils/formatPrice";
import EmptyState from "../common/EmptyState";

/**
 * Slide-in Cart Drawer for instantaneous cart management
 */
const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInRight overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E4E7E9] bg-white">
          <div className="flex items-center gap-2">
            <FiShoppingCart size={20} className="text-[#FA8232]" />
            <h2 className="font-pub font-bold text-lg text-[#191C1F]">
              Shopping Cart ({cartCount})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#77878F] hover:bg-[#F2F4F5] hover:text-[#191C1F] transition-colors"
            aria-label="Close cart"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <EmptyState
              type="cart"
              action={{
                label: "Start Shopping",
                to: "/shop",
                onClick: onClose,
              }}
            />
          ) : (
            <div className="divide-y divide-[#E4E7E9]">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  variant="compact"
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with subtotal & actions */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-[#E4E7E9] bg-[#F8F9FA] flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm font-pub">
              <span className="text-[#5F6C72]">Subtotal:</span>
              <span className="font-bold text-lg text-[#191C1F]">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full text-center py-3 border border-[#2DA5F3] text-[#2DA5F3] hover:bg-[#2DA5F3] hover:text-white rounded-xs text-xs font-pub font-bold transition-colors"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-1.5 py-3 bg-[#FA8232] hover:bg-[#e07228] text-white rounded-xs text-xs font-pub font-bold transition-colors"
              >
                Checkout <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
