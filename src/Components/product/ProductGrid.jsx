import React from "react";
import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";
import { ProductCardSkeleton } from "../common/LoadingSpinner";

/**
 * Reusable Product Grid component supporting multi-column responsive grid and list views.
 * @param {Array} products - Array of product objects
 * @param {boolean} loading - Loading state
 * @param {"grid"|"list"} layout - View mode
 * @param {number} columns - Grid columns on desktop (3 or 4)
 * @param {Function} onQuickView - Callback for quick view modal
 * @param {Object} emptyStateProps - Custom empty state props
 */
const ProductGrid = ({
  products = [],
  loading = false,
  layout = "grid",
  columns = 4,
  onQuickView,
  emptyStateProps = {},
  className = "",
}) => {
  if (loading) {
    return (
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 ${
          columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } gap-3 sm:gap-4 md:gap-5 ${className}`}
      >
        <ProductCardSkeleton count={columns * 2} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        type="products"
        title="No products found"
        description="Try clearing your filters or searching for something else."
        {...emptyStateProps}
      />
    );
  }

  if (layout === "list") {
    return (
      <div className={`flex flex-col gap-3 sm:gap-4 ${className}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            layout="list"
            onQuickView={onQuickView}
          />
        ))}
      </div>
    );
  }

  const gridColsClass =
    columns === 3
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${gridColsClass} gap-3 sm:gap-4 md:gap-5 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          layout="grid"
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
