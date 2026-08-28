import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { useToast } from "../../Context/ToastContext";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import Badge from "../common/Badge";

/**
 * Reusable product card for grids across the site
 * @param {Object} product
 * @param {Function} [onQuickView] - Callback to open quick view modal
 * @param {"grid"|"list"} [layout]
 */
const ProductCard = ({ product, onQuickView, layout = "grid" }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`${product.name || product.title} added to cart`, "success");
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    const msg = wishlisted
      ? `${product.name || product.title} removed from wishlist`
      : `${product.name || product.title} added to wishlist`;
    showToast(msg, "wishlist");
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView && onQuickView(product);
  };

  const imageSrc = imgError
    ? "https://via.placeholder.com/200x200/F2F4F5/ADB7BC?text=No+Image"
    : product.thumbnail || product.images?.[0];

  if (layout === "list") {
    return (
      <div className="flex items-start gap-4 bg-white border border-[#E4E7E9] rounded-sm p-4 hover:shadow-md transition-all duration-300 group">
        {/* Image */}
        <Link
          to={`/product/${product.id}`}
          className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center bg-[#F2F4F5] rounded-sm overflow-hidden"
        >
          <img
            src={imageSrc}
            alt={product.name || product.title}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        </Link>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {product.discount > 0 && (
              <Badge type="discount" value={product.discount} />
            )}
            {product.newArrival && <Badge type="new" />}
          </div>
          <Link
            to={`/product/${product.id}`}
            className="font-pub font-medium text-[14px] sm:text-[15px] text-[#191C1F] hover:text-[#2DA5F3] transition-colors line-clamp-2"
          >
            {product.name || product.title}
          </Link>
          <ProductRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
          />
          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            size="md"
          />
          {product.stock > 0 ? (
            <span className="text-[11px] text-emerald-600 font-pub font-medium">
              In Stock ({product.stock} available)
            </span>
          ) : (
            <span className="text-[11px] text-red-500 font-pub font-medium">
              Out of Stock
            </span>
          )}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex items-center gap-2 bg-[#FA8232] hover:bg-[#e07228] disabled:bg-[#E4E7E9] text-white disabled:text-[#77878F] px-4 py-2 rounded-sm text-[12px] font-pub font-bold transition-all duration-200 cursor-pointer"
              aria-label={`Add ${product.name || product.title} to cart`}
            >
              <FiShoppingCart size={14} />
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`w-9 h-9 flex items-center justify-center border rounded-sm transition-all duration-200 cursor-pointer ${
                wishlisted
                  ? "border-[#FA8232] bg-[#FA8232] text-white"
                  : "border-[#E4E7E9] hover:border-[#FA8232] hover:text-[#FA8232]"
              }`}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlisted ? <GoHeartFill size={16} /> : <GoHeart size={16} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className="group relative bg-white border border-[#E4E7E9] rounded-sm p-3 sm:p-4 hover:shadow-[0px_8px_24px_0px_rgba(25,28,31,0.12)] transition-all duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.discount > 0 && (
          <Badge type="discount" value={product.discount} />
        )}
        {product.newArrival && <Badge type="new" />}
      </div>

      {/* Image Area */}
      <Link
        to={`/product/${product.id}`}
        className="relative flex items-center justify-center h-[140px] sm:h-[160px] md:h-[172px] bg-[#F8F9FA] rounded-sm overflow-hidden mb-3"
        aria-label={`View ${product.name || product.title}`}
      >
        <img
          src={imageSrc}
          alt={product.name || product.title}
          className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Hover action buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
          {/* Wishlist */}
          <button
            onClick={handleToggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
              wishlisted
                ? "bg-[#FA8232] text-white"
                : "bg-white text-[#191C1F] hover:bg-[#FA8232] hover:text-white"
            }`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlisted ? (
              <GoHeartFill className="text-[16px]" />
            ) : (
              <GoHeart className="text-[16px]" />
            )}
          </button>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-10 h-10 rounded-full bg-white text-[#191C1F] flex items-center justify-center shadow-md hover:bg-[#FA8232] hover:text-white disabled:opacity-40 transition-all duration-200 cursor-pointer"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="text-[16px]" />
          </button>

          {/* Quick View */}
          {onQuickView && (
            <button
              onClick={handleQuickView}
              className="w-10 h-10 rounded-full bg-white text-[#191C1F] flex items-center justify-center shadow-md hover:bg-[#2DA5F3] hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Quick view"
            >
              <FiEye className="text-[16px]" />
            </button>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1 gap-1.5">
        <ProductRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
        />

        <Link
          to={`/product/${product.id}`}
          className="font-pub font-normal text-[12px] sm:text-[13px] md:text-[14px] text-[#191C1F] hover:text-[#2DA5F3] transition-colors line-clamp-2 leading-snug"
        >
          {product.name || product.title}
        </Link>

        <div className="mt-auto">
          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
