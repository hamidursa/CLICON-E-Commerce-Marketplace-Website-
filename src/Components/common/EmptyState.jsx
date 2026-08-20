// src/components/common/EmptyState.jsx
import React from "react";
import Button from "./Button";

/**
 * Reusable empty/error state component
 * @param {"cart"|"wishlist"|"search"|"products"|"category"|"error"|"not-found"} type
 * @param {string} [title]
 * @param {string} [description]
 * @param {{ label: string, to?: string, onClick?: Function }} [action]
 */
const EmptyState = ({ type = "products", title, description, action, icon }) => {
  const defaults = {
    cart: {
      icon: CartIcon,
      title: "Your cart is empty",
      description: "Looks like you haven't added anything to your cart yet.",
      action: { label: "Browse Products", to: "/shop" },
    },
    wishlist: {
      icon: HeartIcon,
      title: "Your wishlist is empty",
      description: "Save items you love by clicking the heart icon on any product.",
      action: { label: "Explore Shop", to: "/shop" },
    },
    search: {
      icon: SearchIcon,
      title: "No results found",
      description: "Try adjusting your search or filters to find what you're looking for.",
      action: null,
    },
    products: {
      icon: BoxIcon,
      title: "No products found",
      description: "We couldn't find any products matching your criteria.",
      action: { label: "Clear Filters", onClick: () => {} },
    },
    category: {
      icon: BoxIcon,
      title: "No products in this category",
      description: "This category doesn't have any products yet. Check back soon!",
      action: { label: "View All Products", to: "/shop" },
    },
    "not-found": {
      icon: AlertIcon,
      title: "Product not found",
      description: "The product you're looking for doesn't exist or has been removed.",
      action: { label: "Back to Shop", to: "/shop" },
    },
    error: {
      icon: AlertIcon,
      title: "Something went wrong",
      description: "We encountered an error. Please try again later.",
      action: { label: "Retry", onClick: () => window.location.reload() },
    },
  };

  const config = defaults[type] || defaults.products;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalAction = action || config.action;
  const Icon = icon || config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 mb-5 text-[#ADB7BC]">
        <Icon />
      </div>
      <h3 className="font-pub font-semibold text-[20px] text-[#191C1F] mb-2">
        {finalTitle}
      </h3>
      <p className="font-int text-[14px] text-[#77878F] max-w-xs mb-6">
        {finalDescription}
      </p>
      {finalAction && (
        finalAction.to ? (
          <Button variant="primary" to={finalAction.to} size="md">
            {finalAction.label}
          </Button>
        ) : (
          <Button variant="primary" onClick={finalAction.onClick} size="md">
            {finalAction.label}
          </Button>
        )
      )}
    </div>
  );
};

// --- SVG Icons ---
const CartIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const SearchIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const BoxIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

const AlertIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>
);

export default EmptyState;
