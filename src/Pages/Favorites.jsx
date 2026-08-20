import React, { useState } from "react";
import Container from "../Layouts/Container";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductGrid from "../components/product/ProductGrid";
import QuickViewModal from "../components/product/QuickViewModal";
import EmptyState from "../components/common/EmptyState";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const Favorites = () => {
  const { wishlistItems, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleAddAllToCart = () => {
    wishlistItems.forEach((p) => addToCart(p));
    showToast(`Added all ${wishlistItems.length} items to cart!`, "success");
  };

  return (
    <div className="animate-fadeIn">
      <Breadcrumb items={[{ label: "Wishlist" }]} />

      <Container>
        <div className="py-8 sm:py-12">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E4E7E9]">
            <div>
              <h1 className="font-pub font-bold text-2xl sm:text-3xl text-[#191C1F]">
                My Wishlist
              </h1>
              <p className="text-xs sm:text-sm font-pub text-[#77878F] mt-1">
                {wishlistCount} saved item{wishlistCount !== 1 ? "s" : ""}
              </p>
            </div>

            {wishlistCount > 0 && (
              <button
                onClick={handleAddAllToCart}
                className="bg-[#FA8232] hover:bg-[#e07228] text-white font-pub font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xs transition-colors shadow-xs cursor-pointer"
              >
                Add All to Cart
              </button>
            )}
          </div>

          {wishlistCount === 0 ? (
            <div className="border border-[#E4E7E9] rounded-md bg-white p-8">
              <EmptyState
                type="wishlist"
                title="Your Wishlist is Empty"
                description="Save items you love while shopping to view and purchase them later."
                action={{ label: "Discover Products", to: "/shop" }}
              />
            </div>
          ) : (
            <ProductGrid
              products={wishlistItems}
              columns={4}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          )}
        </div>
      </Container>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Favorites;
