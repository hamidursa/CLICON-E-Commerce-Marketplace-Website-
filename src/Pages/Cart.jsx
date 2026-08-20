import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Container from "../Layouts/Container";
import Breadcrumb from "../components/common/Breadcrumb";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import CouponInput from "../components/cart/CouponInput";
import EmptyState from "../components/common/EmptyState";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();
  const [discountPct, setDiscountPct] = useState(0);

  const handleApplyCoupon = (discount) => {
    setDiscountPct(discount);
  };

  const handleRemoveCoupon = () => {
    setDiscountPct(0);
  };

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: "Shopping Cart" }]} />

      <Container>
        <div className="py-8 sm:py-12">
          <h1 className="font-pub font-bold text-2xl sm:text-3xl text-[#191C1F] mb-6">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="border border-[#E4E7E9] rounded-md bg-white p-8">
              <EmptyState
                type="cart"
                title="Your Shopping Cart is Empty"
                description="Explore our catalog and find the latest technology products to add to your cart."
                action={{ label: "Go to Shop", to: "/shop" }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Cart Table (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="border border-[#E4E7E9] rounded-md bg-white overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#F2F4F5] text-xs font-pub font-semibold text-[#475156] uppercase tracking-wider border-b border-[#E4E7E9]">
                        <tr>
                          <th className="py-3 px-4 sm:px-6">Product</th>
                          <th className="py-3 px-4 sm:px-6">Price</th>
                          <th className="py-3 px-4 sm:px-6">Quantity</th>
                          <th className="py-3 px-4 sm:px-6">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table bottom actions */}
                  <div className="p-4 sm:p-6 border-t border-[#E4E7E9] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8F9FA]">
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 font-pub font-bold text-xs sm:text-sm text-[#2DA5F3] hover:underline"
                    >
                      <FaArrowLeftLong size={12} />
                      <span>Continue Shopping</span>
                    </Link>

                    <button
                      onClick={clearCart}
                      className="text-xs font-pub font-semibold text-red-500 hover:underline cursor-pointer"
                    >
                      Clear Shopping Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar: Order Summary & Coupon (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <CartSummary
                  subtotal={cartTotal}
                  discountPercentage={discountPct}
                />

                <CouponInput
                  onApply={handleApplyCoupon}
                  applied={discountPct > 0}
                  onRemove={handleRemoveCoupon}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Cart;
