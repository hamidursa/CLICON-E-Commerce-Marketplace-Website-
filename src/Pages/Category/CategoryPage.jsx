import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../../Layouts/Container";
import Breadcrumb from "../../Components/common/Breadcrumb";
import ProductGrid from "../../Components/product/ProductGrid";
import QuickViewModal from "../../Components/product/QuickViewModal";
import EmptyState from "../../Components/common/EmptyState";
import { products } from "../../data/products";
import { getCategoryBySlug, categories } from "../../data/categories";
import { sortProducts, SORT_OPTIONS } from "../../utils/sortProducts";

const CategoryPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const category = getCategoryBySlug(slug);

  const categoryProducts = useMemo(() => {
    const list = products.filter((p) => p.category === slug);
    return sortProducts(list, sortBy);
  }, [slug, sortBy]);

  if (!category) {
    return (
      <div className="py-16">
        <Container>
          <EmptyState
            type="not-found"
            title="Category Not Found"
            description="The category you are looking for does not exist."
            action={{ label: "View All Categories", to: "/shop" }}
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Shop", to: "/shop" },
          { label: category.name },
        ]}
      />

      <Container>
        <div className="py-8 sm:py-12">
          {/* Category Banner Header */}
          <div className="bg-[#F2F4F5] border border-[#E4E7E9] rounded-md p-6 sm:p-10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-3xl mb-2 block">{category.icon}</span>
              <h1 className="font-pub font-bold text-2xl sm:text-3xl text-[#191C1F]">
                {category.name}
              </h1>
              <p className="font-pub text-sm text-[#5F6C72] mt-2 leading-relaxed">
                {category.description}
              </p>
              <span className="inline-block mt-3 text-xs font-pub font-semibold text-[#FA8232]">
                {categoryProducts.length} items available
              </span>
            </div>

            {category.image && (
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-full p-4 flex items-center justify-center border border-[#E4E7E9] shrink-0 shadow-xs">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Sibling Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
            <span className="text-xs font-pub font-bold text-[#77878F] uppercase shrink-0">
              Other Categories:
            </span>
            {categories
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/category/${c.slug}`}
                  className="text-xs font-pub bg-[#F8F9FA] hover:bg-[#FA8232] hover:text-white border border-[#E4E7E9] px-3 py-1.5 rounded-full transition-colors shrink-0"
                >
                  {c.name}
                </Link>
              ))}
          </div>

          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E4E7E9]">
            <span className="text-xs sm:text-sm font-pub text-[#5F6C72]">
              Showing <strong>{categoryProducts.length}</strong> products
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#77878F] font-pub hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E4E7E9] rounded-sm text-xs sm:text-sm font-pub px-3 py-1.5 text-[#191C1F] outline-none focus:border-[#FA8232]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={categoryProducts}
            columns={4}
            onQuickView={(p) => setQuickViewProduct(p)}
            emptyStateProps={{
              type: "category",
              title: `No products in ${category.name}`,
              description:
                "We are updating this inventory soon. Check out our full store catalog!",
              action: { label: "Explore All Products", to: "/shop" },
            }}
          />
        </div>
      </Container>

      {/* Quick View Modal */}
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

export default CategoryPage;
