import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { formatPrice } from "../../utils/formatPrice";
import CategoryIcon from "../common/CategoryIcon";

/**
 * Functional Desktop SearchBar with instant suggestion dropdown and SVG icons
 */
const SearchBar = ({ className = "" }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [matchedCategories, setMatchedCategories] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setMatchedCategories([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase().trim();

    // Filter products
    const filteredProducts = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 5);

    // Filter categories
    const filteredCats = categories
      .filter((c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q))
      .slice(0, 3);

    setResults(filteredProducts);
    setMatchedCategories(filteredCats);
    setIsOpen(true);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="Search for anything..."
          className="w-full bg-white text-[#191C1F] font-pub py-3 pl-4 pr-12 text-sm rounded-sm placeholder:text-[#77878F] outline-none shadow-sm focus:ring-2 focus:ring-[#FA8232] transition-all"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[#77878F] hover:text-[#191C1F] p-1"
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
          <button
            type="submit"
            className="text-[#191C1F] hover:text-[#FA8232] transition-colors p-1 cursor-pointer"
            aria-label="Submit search"
          >
            <FiSearch size={20} />
          </button>
        </div>
      </form>

      {/* Suggestion Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-md shadow-2xl border border-[#E4E7E9] overflow-hidden z-[9999] animate-fadeIn max-h-[420px] overflow-y-auto">
          {/* Matched Categories */}
          {matchedCategories.length > 0 && (
            <div className="p-3 bg-[#F8F9FA] border-b border-[#E4E7E9]">
              <span className="text-[11px] font-pub font-semibold text-[#77878F] uppercase tracking-wider block mb-2">
                Categories
              </span>
              <div className="flex flex-wrap gap-2">
                {matchedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs bg-white border border-[#E4E7E9] px-2.5 py-1.5 rounded-sm text-[#191C1F] hover:border-[#FA8232] hover:text-[#FA8232] transition-colors"
                  >
                    <CategoryIcon slug={cat.slug} size={14} className="text-[#FA8232]" />
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Matched Products */}
          {results.length > 0 ? (
            <div className="divide-y divide-[#E4E7E9]">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-[#F2F4F5] transition-colors group"
                >
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="w-12 h-12 object-contain bg-[#F8F9FA] p-1 rounded-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-pub font-medium text-[#191C1F] group-hover:text-[#2DA5F3] truncate">
                      {product.name}
                    </p>
                    <span className="text-xs font-pub font-semibold text-[#FA8232]">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </Link>
              ))}

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-center py-2.5 text-xs font-pub font-semibold text-[#2DA5F3] hover:bg-[#F2F4F5] transition-colors cursor-pointer"
              >
                View all results for &ldquo;{query}&rdquo;
              </button>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#77878F]">
              No products found matching &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
