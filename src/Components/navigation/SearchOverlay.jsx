import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSearch, FiX, FiArrowLeft } from "react-icons/fi";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { formatPrice } from "../../utils/formatPrice";

/**
 * Fullscreen Mobile Search Overlay
 */
const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [matchedCats, setMatchedCats] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setMatchedCats([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 8);

    const cats = categories
      .filter((c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q))
      .slice(0, 4);

    setResults(filtered);
    setMatchedCats(cats);
  }, [query]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[99999] flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-[#E4E7E9] bg-white">
        <button
          onClick={onClose}
          className="p-1 text-[#191C1F] hover:text-[#FA8232]"
          aria-label="Back"
        >
          <FiArrowLeft size={22} />
        </button>

        <form onSubmit={handleSubmit} className="flex-1 flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands..."
            className="w-full bg-[#F2F4F5] rounded-full py-2.5 pl-4 pr-10 text-sm font-pub outline-none focus:ring-2 focus:ring-[#FA8232]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 text-[#77878F]"
            >
              <FiX size={18} />
            </button>
          )}
        </form>

        <button
          onClick={handleSubmit}
          className="bg-[#FA8232] text-white p-2.5 rounded-full"
          aria-label="Search"
        >
          <FiSearch size={18} />
        </button>
      </div>

      {/* Results Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {matchedCats.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-pub font-semibold text-[#77878F] uppercase tracking-wider block mb-2">
              Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {matchedCats.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs bg-[#F2F4F5] px-3 py-1.5 rounded-full text-[#191C1F]"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 ? (
          <div>
            <span className="text-xs font-pub font-semibold text-[#77878F] uppercase tracking-wider block mb-2">
              Products
            </span>
            <div className="divide-y divide-[#E4E7E9]">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 py-3"
                >
                  <img
                    src={p.thumbnail}
                    alt=""
                    className="w-14 h-14 object-contain bg-[#F8F9FA] p-1 rounded shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-pub font-medium text-[#191C1F] line-clamp-1">
                      {p.name}
                    </p>
                    <p className="text-xs font-pub font-semibold text-[#FA8232] mt-0.5">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : query.trim() ? (
          <div className="text-center py-12 text-[#77878F] text-sm font-pub">
            No items match &ldquo;{query}&rdquo;
          </div>
        ) : (
          <div className="py-6">
            <span className="text-xs font-pub font-semibold text-[#77878F] uppercase tracking-wider block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {["iPhone", "MacBook", "Headphones", "Smart Watch", "Gaming", "Sony 4K TV"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                    }}
                    className="text-xs bg-[#F2F4F5] text-[#191C1F] px-3 py-1.5 rounded-full hover:bg-[#FA8232] hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
