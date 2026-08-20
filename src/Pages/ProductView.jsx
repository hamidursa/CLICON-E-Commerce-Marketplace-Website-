import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiShoppingCart, FiShare2 } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BsShieldCheck, BsTruck, BsArrowRepeat } from "react-icons/bs";
import Container from "../Layouts/Container";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductGallery from "../components/product/ProductGallery";
import ProductRating from "../components/product/ProductRating";
import ProductPrice from "../components/product/ProductPrice";
import Badge from "../components/common/Badge";
import QuantitySelector from "../components/cart/QuantitySelector";
import Button from "../components/common/Button";
import RelatedProducts from "../components/product/RelatedProducts";
import EmptyState from "../components/common/EmptyState";
import { products, getRelatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const ProductView = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  // Find product by id (or match slug if param is non-numeric)
  const product =
    products.find((p) => p.id === parseInt(id, 10)) ||
    products.find((p) => p.slug === id);

  if (!product) {
    return (
      <div className="py-16">
        <Container>
          <EmptyState
            type="not-found"
            title="Product Not Found"
            description="The product you are looking for is not in our catalog."
            action={{ label: "Back to Shop", to: "/shop" }}
          />
        </Container>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const related = getRelatedProducts(product, 4);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(
      `${quantity} × ${product.name || product.title} added to cart!`,
      "success"
    );
    setQuantity(1);
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "info");
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Shop", to: "/shop" },
          {
            label: product.category?.toUpperCase() || "ELECTRONICS",
            to: `/category/${product.category}`,
          },
          { label: product.name || product.title },
        ]}
      />

      <Container>
        <div className="py-8 sm:py-12">
          {/* Main Product Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
            {/* Gallery Column (6 Cols) */}
            <div className="lg:col-span-6">
              <ProductGallery images={images} title={product.name} />
            </div>

            {/* Product Details Column (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              {/* Badges & Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.discount > 0 && (
                    <Badge type="discount" value={product.discount} />
                  )}
                  {product.newArrival && <Badge type="new" />}
                  {product.brand && (
                    <span className="text-xs font-pub font-bold text-[#5F6C72] uppercase tracking-wider">
                      {product.brand}
                    </span>
                  )}
                </div>

                <h1 className="font-pub font-bold text-2xl sm:text-3xl md:text-4xl text-[#191C1F] leading-tight">
                  {product.name || product.title}
                </h1>
              </div>

              {/* Rating & SKU info */}
              <div className="flex items-center gap-4 flex-wrap">
                <ProductRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                />
                <span className="text-xs text-[#ADB7BC]">|</span>
                <span className="text-xs font-pub text-[#77878F]">
                  SKU: <strong className="text-[#191C1F]">{product.sku}</strong>
                </span>
                <span className="text-xs text-[#ADB7BC]">|</span>
                <span
                  className={`text-xs font-pub font-semibold ${
                    product.stock > 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Price Display */}
              <div className="py-3 border-y border-[#E4E7E9]">
                <ProductPrice
                  price={product.price}
                  originalPrice={product.originalPrice}
                  size="lg"
                />
              </div>

              {/* Short Description */}
              <p className="font-int text-sm sm:text-base text-[#5F6C72] leading-relaxed">
                {product.description}
              </p>

              {/* Purchase Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  max={product.stock || 10}
                  size="lg"
                />

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1"
                >
                  <FiShoppingCart size={18} />
                  <span>Add to Cart</span>
                </Button>

                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 flex items-center justify-center border rounded-xs transition-colors shrink-0 ${
                    wishlisted
                      ? "border-[#FA8232] bg-[#FA8232] text-white"
                      : "border-[#E4E7E9] text-[#191C1F] hover:border-[#FA8232] hover:text-[#FA8232]"
                  }`}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {wishlisted ? <GoHeartFill size={22} /> : <GoHeart size={22} />}
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-12 h-12 flex items-center justify-center border border-[#E4E7E9] rounded-xs text-[#191C1F] hover:border-[#2DA5F3] hover:text-[#2DA5F3] transition-colors shrink-0"
                  aria-label="Share product"
                >
                  <FiShare2 size={20} />
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#F8F9FA] rounded-md border border-[#E4E7E9] mt-2">
                <div className="flex items-center gap-2.5">
                  <BsTruck className="text-[#2DA5F3] shrink-0" size={22} />
                  <div className="text-left">
                    <span className="text-xs font-pub font-bold text-[#191C1F] block">
                      Free Shipping
                    </span>
                    <span className="text-[11px] text-[#77878F] block">
                      On orders over $50
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <BsArrowRepeat className="text-[#FA8232] shrink-0" size={22} />
                  <div className="text-left">
                    <span className="text-xs font-pub font-bold text-[#191C1F] block">
                      30 Days Return
                    </span>
                    <span className="text-[11px] text-[#77878F] block">
                      Hassle free policy
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <BsShieldCheck className="text-emerald-600 shrink-0" size={22} />
                  <div className="text-left">
                    <span className="text-xs font-pub font-bold text-[#191C1F] block">
                      1 Year Warranty
                    </span>
                    <span className="text-[11px] text-[#77878F] block">
                      100% genuine product
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Tabs (Description / Specifications / Reviews) */}
          <div className="border border-[#E4E7E9] rounded-md mb-12 overflow-hidden shadow-2xs">
            {/* Tab Headers */}
            <div className="flex border-b border-[#E4E7E9] bg-[#F8F9FA] overflow-x-auto">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 text-sm font-pub font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === "description"
                    ? "border-[#FA8232] text-[#FA8232] bg-white"
                    : "border-transparent text-[#5F6C72] hover:text-[#191C1F]"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`px-6 py-4 text-sm font-pub font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === "specifications"
                    ? "border-[#FA8232] text-[#FA8232] bg-white"
                    : "border-transparent text-[#5F6C72] hover:text-[#191C1F]"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`px-6 py-4 text-sm font-pub font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === "shipping"
                    ? "border-[#FA8232] text-[#FA8232] bg-white"
                    : "border-transparent text-[#5F6C72] hover:text-[#191C1F]"
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8 bg-white">
              {activeTab === "description" && (
                <div className="prose max-w-none text-sm font-int text-[#5F6C72] leading-relaxed">
                  <p>{product.description}</p>
                  <p className="mt-4">
                    Built to the highest manufacturing standards, the {product.name} delivers precision engineering, reliable battery efficiency, and intuitive daily operation.
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-pub">
                    <tbody className="divide-y divide-[#E4E7E9]">
                      <tr className="bg-[#F8F9FA]">
                        <td className="py-2.5 px-4 font-semibold text-[#191C1F] w-1/3">
                          Brand
                        </td>
                        <td className="py-2.5 px-4 text-[#5F6C72]">
                          {product.brand || "Clicon Verified"}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-semibold text-[#191C1F]">
                          Category
                        </td>
                        <td className="py-2.5 px-4 text-[#5F6C72]">
                          {product.category}
                        </td>
                      </tr>
                      {product.weight && (
                        <tr className="bg-[#F8F9FA]">
                          <td className="py-2.5 px-4 font-semibold text-[#191C1F]">
                            Weight
                          </td>
                          <td className="py-2.5 px-4 text-[#5F6C72]">
                            {product.weight} kg
                          </td>
                        </tr>
                      )}
                      {product.specifications &&
                        Object.entries(product.specifications).map(
                          ([key, value], idx) => (
                            <tr
                              key={key}
                              className={idx % 2 === 0 ? "bg-[#F8F9FA]" : ""}
                            >
                              <td className="py-2.5 px-4 font-semibold text-[#191C1F]">
                                {key}
                              </td>
                              <td className="py-2.5 px-4 text-[#5F6C72]">
                                {value}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="flex flex-col gap-4 text-sm font-pub text-[#5F6C72]">
                  <p>
                    <strong className="text-[#191C1F]">Shipping Information:</strong> All orders are processed within 24 business hours. Free standard delivery applies to orders over $50 USD. Expedited next-day options available at checkout.
                  </p>
                  <p>
                    <strong className="text-[#191C1F]">30-Day Return Guarantee:</strong> If you are not completely satisfied with your purchase, return it in original condition with packaging within 30 days for a full refund or exchange.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Grid */}
          <RelatedProducts products={related} />
        </div>
      </Container>
    </div>
  );
};

export default ProductView;
