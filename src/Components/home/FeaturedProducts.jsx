import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { products } from "../../data/products";
import Pdt_Img from "../../assets/Products/img1.jpg";
import ProductCard from "../product/ProductCard";
import QuickViewModal from "../product/QuickViewModal";

const tabs = [
  { id: "all", label: "All Products" },
  { id: "smartphones", label: "Smart Phone" },
  { id: "computers", label: "Laptop & PC" },
  { id: "headphones", label: "Headphones" },
  { id: "accessories", label: "Accessories" },
];

/**
 * Featured Products section with category tabs, side promotion banner, and quick view modal
 */
const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filteredProducts =
    activeTab === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-8 sm:py-12">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Promo Card (3 Cols on Desktop) */}
          <div className="lg:col-span-3 bg-[#F3DE6D] rounded-md p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-xs overflow-hidden relative">
            <div className="relative z-10">
              <span className="text-xs font-pub font-bold text-[#BE4646] uppercase tracking-wider block">
                Computer & Accessories
              </span>
              <h3 className="text-2xl sm:text-3xl font-pub font-bold text-[#191C1F] mt-2">
                32% Discount
              </h3>
              <p className="text-xs sm:text-sm font-pub text-[#475156] mt-2 max-w-xs">
                For all selected electronics products this season.
              </p>

              <div className="inline-flex items-center gap-1.5 bg-white py-1.5 px-3 rounded-xs mt-4 shadow-2xs">
                <span className="text-[11px] font-pub text-[#5F6C72]">Offer ends in:</span>
                <span className="text-xs font-pub font-bold text-[#191C1F]">
                  END OF MONTH
                </span>
              </div>

              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#e07228] text-white font-pub font-bold text-sm px-6 py-2.5 rounded-xs transition-all shadow-sm"
                >
                  Shop Now <FaArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div className="mt-6 w-full max-w-[220px]">
              <img
                src={Pdt_Img}
                alt="Promo Computer"
                className="w-full h-auto object-contain rounded-xs"
              />
            </div>
          </div>

          {/* Right Product Grid Area (9 Cols on Desktop) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* Header & Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7E9] pb-4">
              <h2 className="font-pub font-bold text-xl sm:text-2xl text-[#191C1F]">
                Featured Products
              </h2>

              <div className="flex items-center gap-2 sm:gap-6 flex-wrap justify-between sm:justify-end">
                {/* Tabs */}
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 text-xs sm:text-sm font-pub font-semibold rounded-sm transition-colors cursor-pointer shrink-0 ${
                        activeTab === tab.id
                          ? "bg-[#FA8232] text-white"
                          : "text-[#5F6C72] hover:text-[#191C1F] hover:bg-[#F2F4F5]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-pub font-bold text-[#FA8232] hover:underline shrink-0"
                >
                  <span>Browse All</span>
                  <FaArrowRight size={10} />
                </Link>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};

export default FeaturedProducts;
