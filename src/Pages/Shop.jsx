import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { FiX, FiFilter } from "react-icons/fi";
import Container from "../Layouts/Container";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductGrid from "../components/product/ProductGrid";
import QuickViewModal from "../components/product/QuickViewModal";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { brands } from "../data/brands";
import { filterProducts } from "../utils/filterProducts";
import { sortProducts, SORT_OPTIONS } from "../utils/sortProducts";

const priceRanges = [
  { id: "all", label: "All Price", min: 0, max: 10000 },
  { id: "u100", label: "Under $100", min: 0, max: 100 },
  { id: "100-300", label: "$100 to $300", min: 100, max: 300 },
  { id: "300-500", label: "$300 to $500", min: 300, max: 500 },
  { id: "500-1000", label: "$500 to $1,000", min: 500, max: 1000 },
  { id: "1000plus", label: "$1,000 & Above", min: 1000, max: 10000 },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL State
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  // Local Filter States
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync with searchParams
  useEffect(() => {
    const q = searchParams.get("search") || "";
    const cat = searchParams.get("category") || "";
    setSearch(q);
    setSelectedCategory(cat);
  }, [searchParams]);

  // Handle Brand Checkbox toggle
  const toggleBrand = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedBrands([]);
    setSelectedPriceRange("all");
    setMinRating(0);
    setInStockOnly(false);
    setSortBy("featured");
    setSearchParams({});
  };

  // Active price range object
  const activePriceObj =
    priceRanges.find((p) => p.id === selectedPriceRange) || priceRanges[0];

  // Filtered and Sorted Products
  const filteredList = useMemo(() => {
    const res = filterProducts(products, {
      search,
      category: selectedCategory,
      brands: selectedBrands,
      priceRange: [activePriceObj.min, activePriceObj.max],
      minRating,
      inStockOnly,
    });
    return sortProducts(res, sortBy);
  }, [
    search,
    selectedCategory,
    selectedBrands,
    activePriceObj,
    minRating,
    inStockOnly,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    (selectedPriceRange !== "all" ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className="animate-fadeIn">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Shop", to: "/shop" },
          ...(selectedCategory
            ? [{ label: selectedCategory.toUpperCase() }]
            : []),
        ]}
      />

      <Container>
        <div className="py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar Filters (Desktop & Mobile Drawer) */}
            <aside
              className={`fixed inset-y-0 left-0 z-[9999] lg:static lg:z-auto w-[280px] sm:w-[320px] lg:w-auto bg-white p-6 lg:p-0 shadow-2xl lg:shadow-none overflow-y-auto lg:overflow-visible transition-transform duration-300 lg:translate-x-0 ${
                mobileFilterOpen ? "translate-x-0" : "-translate-x-full"
              } lg:col-span-3 border-r lg:border-r-0 lg:border-none border-[#E4E7E9]`}
            >
              {/* Mobile filter header */}
              <div className="flex items-center justify-between lg:hidden pb-4 mb-4 border-b border-[#E4E7E9]">
                <h3 className="font-pub font-bold text-lg text-[#191C1F]">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#77878F]"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {/* Active Filter summary & Reset */}
                {activeFiltersCount > 0 && (
                  <div className="flex items-center justify-between bg-[#F2F4F5] p-3 rounded-sm">
                    <span className="text-xs font-pub font-semibold text-[#191C1F]">
                      {activeFiltersCount} Active Filter{activeFiltersCount > 1 ? "s" : ""}
                    </span>
                    <button
                      onClick={resetFilters}
                      className="text-xs font-pub font-bold text-[#FA8232] hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                {/* 1. Category Filter */}
                <div className="border-b border-[#E4E7E9] pb-6">
                  <h3 className="font-pub font-bold text-sm sm:text-base text-[#191C1F] mb-3 uppercase tracking-wider">
                    Category
                  </h3>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2.5 text-sm font-pub text-[#475156] cursor-pointer hover:text-[#FA8232]">
                      <input
                        type="radio"
                        name="category"
                        checked={!selectedCategory}
                        onChange={() => setSelectedCategory("")}
                        className="accent-[#FA8232]"
                      />
                      <span>All Categories ({products.length})</span>
                    </label>
                    {categories.map((cat) => {
                      const count = products.filter(
                        (p) => p.category === cat.slug
                      ).length;
                      return (
                        <label
                          key={cat.id}
                          className="flex items-center gap-2.5 text-sm font-pub text-[#475156] cursor-pointer hover:text-[#FA8232]"
                        >
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat.slug}
                            onChange={() => setSelectedCategory(cat.slug)}
                            className="accent-[#FA8232]"
                          />
                          <span>
                            {cat.name} ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Price Range Filter */}
                <div className="border-b border-[#E4E7E9] pb-6">
                  <h3 className="font-pub font-bold text-sm sm:text-base text-[#191C1F] mb-3 uppercase tracking-wider">
                    Price Range
                  </h3>
                  <div className="flex flex-col gap-2">
                    {priceRanges.map((pr) => (
                      <label
                        key={pr.id}
                        className="flex items-center gap-2.5 text-sm font-pub text-[#475156] cursor-pointer hover:text-[#FA8232]"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          checked={selectedPriceRange === pr.id}
                          onChange={() => setSelectedPriceRange(pr.id)}
                          className="accent-[#FA8232]"
                        />
                        <span>{pr.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. Popular Brands Filter */}
                <div className="border-b border-[#E4E7E9] pb-6">
                  <h3 className="font-pub font-bold text-sm sm:text-base text-[#191C1F] mb-3 uppercase tracking-wider">
                    Popular Brands
                  </h3>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {brands.slice(0, 12).map((brand) => (
                      <label
                        key={brand.id}
                        className="flex items-center gap-2 text-xs sm:text-sm font-pub text-[#475156] cursor-pointer hover:text-[#FA8232]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => toggleBrand(brand.name)}
                          className="accent-[#FA8232] rounded-2xs"
                        />
                        <span className="truncate">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Availability */}
                <div>
                  <h3 className="font-pub font-bold text-sm sm:text-base text-[#191C1F] mb-3 uppercase tracking-wider">
                    Availability
                  </h3>
                  <label className="flex items-center gap-2.5 text-sm font-pub text-[#475156] cursor-pointer hover:text-[#FA8232]">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-[#FA8232] rounded-2xs"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Mobile backdrop */}
            {mobileFilterOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-[9998] lg:hidden"
                onClick={() => setMobileFilterOpen(false)}
              />
            )}

            {/* Main Product Catalog (9 Cols) */}
            <main className="lg:col-span-9">
              {/* Controls Bar: Sort, View Toggle, Count & Mobile Filter Trigger */}
              <div className="bg-[#F2F4F5] p-3 sm:p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                {/* Search / Count / Mobile Trigger */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden inline-flex items-center gap-2 bg-white border border-[#E4E7E9] px-3 py-1.5 rounded-sm text-xs font-pub font-bold text-[#191C1F]"
                  >
                    <FiFilter size={14} />
                    <span>Filters ({activeFiltersCount})</span>
                  </button>

                  <span className="text-xs sm:text-sm font-pub text-[#5F6C72]">
                    Showing <strong className="text-[#191C1F]">{filteredList.length}</strong> of{" "}
                    <strong>{products.length}</strong> products
                  </span>
                </div>

                {/* Sort & Grid/List View Mode */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
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

                  <div className="flex items-center gap-1 bg-white border border-[#E4E7E9] rounded-sm p-0.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-2xs transition-colors ${
                        viewMode === "grid"
                          ? "bg-[#FA8232] text-white"
                          : "text-[#77878F] hover:text-[#191C1F]"
                      }`}
                      aria-label="Grid view"
                    >
                      <BsGrid3X3GapFill size={14} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-2xs transition-colors ${
                        viewMode === "list"
                          ? "bg-[#FA8232] text-white"
                          : "text-[#77878F] hover:text-[#191C1F]"
                      }`}
                      aria-label="List view"
                    >
                      <BsListUl size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <ProductGrid
                products={filteredList}
                layout={viewMode}
                columns={3}
                onQuickView={(p) => setQuickViewProduct(p)}
                emptyStateProps={{
                  action: {
                    label: "Reset All Filters",
                    onClick: resetFilters,
                  },
                }}
              />
            </main>
          </div>
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

export default Shop;