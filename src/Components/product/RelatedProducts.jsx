import React, { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

/**
 * Related Products Section
 * @param {Array} products - Array of related products
 * @param {string} title
 */
const RelatedProducts = ({
  products = [],
  title = "Related Products",
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 border-t border-[#E4E7E9]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-pub font-semibold text-[20px] sm:text-[24px] text-[#191C1F]">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

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

export default RelatedProducts;
