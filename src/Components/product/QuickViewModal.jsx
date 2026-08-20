import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Modal from "../common/Modal";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import Badge from "../common/Badge";
import QuantitySelector from "../cart/QuantitySelector";
import Button from "../common/Button";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { useToast } from "../../Context/ToastContext";

/**
 * Quick View Product Modal component
 * @param {Object} product
 * @param {boolean} isOpen
 * @param {Function} onClose
 */
const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);
  const images = product.images?.length > 0 ? product.images : [product.thumbnail];
  const activeImage = images[selectedImg] || product.thumbnail;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(
      `${quantity} × ${product.name || product.title} added to cart`,
      "success"
    );
    setQuantity(1);
    onClose();
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      wishlisted
        ? `${product.name || product.title} removed from wishlist`
        : `${product.name || product.title} added to wishlist`,
      "wishlist"
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Gallery Preview */}
          <div className="flex flex-col gap-3">
            <div className="h-[260px] sm:h-[320px] bg-[#F2F4F5] rounded-sm p-4 flex items-center justify-center border border-[#E4E7E9]">
              <img
                src={activeImage}
                alt={product.name || product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-16 h-16 shrink-0 bg-[#F2F4F5] rounded-sm border p-1 ${
                      selectedImg === i ? "border-[#FA8232]" : "border-[#E4E7E9]"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {product.discount > 0 && (
                  <Badge type="discount" value={product.discount} />
                )}
                {product.brand && (
                  <span className="text-xs font-pub font-semibold text-[#5F6C72] uppercase tracking-wider">
                    {product.brand}
                  </span>
                )}
              </div>
              <h2 className="font-pub font-semibold text-[20px] sm:text-[22px] text-[#191C1F] leading-tight">
                {product.name || product.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <ProductRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                size="md"
              />
              <span className="text-xs text-[#ADB7BC]">|</span>
              <span
                className={`text-xs font-pub font-semibold ${
                  product.stock > 0 ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} left)`
                  : "Out of Stock"}
              </span>
            </div>

            <div className="py-2 border-y border-[#E4E7E9]">
              <ProductPrice
                price={product.price}
                originalPrice={product.originalPrice}
                size="lg"
              />
            </div>

            <p className="font-int text-[13px] sm:text-[14px] text-[#5F6C72] line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  max={product.stock || 10}
                  size="md"
                />

                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1"
                >
                  <FiShoppingCart size={16} />
                  Add to Cart
                </Button>

                <button
                  onClick={handleToggleWishlist}
                  className={`w-11 h-11 flex items-center justify-center border rounded-sm transition-colors cursor-pointer ${
                    wishlisted
                      ? "border-[#FA8232] bg-[#FA8232] text-white"
                      : "border-[#E4E7E9] text-[#191C1F] hover:border-[#FA8232] hover:text-[#FA8232]"
                  }`}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {wishlisted ? <GoHeartFill size={20} /> : <GoHeart size={20} />}
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-pub font-semibold text-[#2DA5F3] hover:underline self-start mt-1"
              >
                View Full Details <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
