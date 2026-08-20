// src/components/common/Button.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Reusable Button component
 * @param {"primary"|"secondary"|"outline"|"ghost"|"danger"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {string} [to] - If provided renders as <Link>
 * @param {boolean} [loading]
 * @param {boolean} [fullWidth]
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  loading = false,
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-pub font-bold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#FA8232] text-white hover:bg-[#e07228] focus-visible:ring-[#FA8232] rounded-sm",
    secondary:
      "bg-[#2DA5F3] text-white hover:bg-[#1b8fd8] focus-visible:ring-[#2DA5F3] rounded-sm",
    outline:
      "bg-transparent text-[#FA8232] border-2 border-[#FA8232] hover:bg-[#FA8232] hover:text-white focus-visible:ring-[#FA8232] rounded-sm",
    outlineBlue:
      "bg-transparent text-[#2DA5F3] border-2 border-[#2DA5F3] hover:bg-[#2DA5F3] hover:text-white focus-visible:ring-[#2DA5F3] rounded-sm",
    ghost:
      "bg-transparent text-[#475156] hover:bg-[#F2F4F5] hover:text-[#191C1F] focus-visible:ring-[#E4E7E9] rounded-sm",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400 rounded-sm",
    dark:
      "bg-[#191C1F] text-white hover:bg-[#303639] focus-visible:ring-[#191C1F] rounded-sm",
  };

  const sizes = {
    sm: "text-[12px] px-4 py-2 h-9",
    md: "text-[14px] px-6 py-2.5 h-11",
    lg: "text-[16px] px-8 py-3 h-12",
  };

  const classes = [
    base,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {loading ? <Spinner /> : children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? <Spinner /> : children}
    </button>
  );
};

const Spinner = () => (
  <svg
    className="w-4 h-4 animate-spin"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export default Button;
