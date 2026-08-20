import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  MdOutlineShoppingCart,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { FiMenu, FiSearch, FiPhoneCall, FiX } from "react-icons/fi";
import { PiMapPinLine, PiHeadphones, PiInfo } from "react-icons/pi";
import { FaRepeat } from "react-icons/fa6";

import AnnouncementBar from "./AnnouncementBar";
import SearchBar from "./SearchBar";
import SearchOverlay from "./SearchOverlay";
import MobileMenu from "./MobileMenu";
import Logo from "../../assets/logo.png";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { categories } from "../../data/categories";

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const catMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (catMenuRef.current && !catMenuRef.current.contains(e.target)) {
        setCategoryDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please enter both email and password.");
      return;
    }
    // Demo login success
    setUserDropdownOpen(false);
    setLoginForm({ email: "", password: "" });
    setLoginError("");
    alert("Signed in successfully!");
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Brand & Search Bar */}
      <header className="bg-[#1B6392] text-white font-pub sticky top-0 md:static z-40">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3.5 sm:py-5 gap-3 md:gap-8">
            {/* Left: Mobile Hamburger & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-1 text-white hover:text-[#FA8232] transition-colors"
                aria-label="Open mobile menu"
              >
                <FiMenu size={26} />
              </button>

              <Link
                to="/"
                className="flex items-center gap-2 text-white hover:opacity-95 transition-opacity"
              >
                <img src={Logo} alt="Clicon" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                <h1 className="font-pub text-2xl sm:text-[32px] font-bold tracking-tight">
                  CLICON
                </h1>
              </Link>
            </div>

            {/* Middle: Desktop Search */}
            <div className="hidden md:block flex-1 max-w-[620px]">
              <SearchBar />
            </div>

            {/* Right: Actions (Search on mobile, Cart, Wishlist, User) */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Mobile search trigger */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                className="md:hidden text-white hover:text-[#FA8232] p-1"
                aria-label="Open search"
              >
                <FiSearch size={22} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative text-white hover:text-[#FA8232] transition-colors p-1"
                aria-label="Wishlist"
              >
                <FaRegHeart className="text-[22px] sm:text-[26px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-[#FA8232] text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#1B6392]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart */}
              <Link
                to="/cart"
                className="relative text-white hover:text-[#FA8232] transition-colors p-1"
                aria-label="Cart"
              >
                <MdOutlineShoppingCart className="text-[24px] sm:text-[28px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-[#FA8232] text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#1B6392]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="text-white hover:text-[#FA8232] transition-colors p-1 flex items-center"
                  aria-label="User account"
                >
                  <AiOutlineUser className="text-[24px] sm:text-[28px]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[300px] sm:w-[340px] bg-white rounded-md shadow-2xl p-5 border border-[#E4E7E9] z-[9999] text-[#191C1F] animate-fadeIn">
                    <h3 className="font-pub font-semibold text-lg text-center mb-4">
                      Sign in to your account
                    </h3>
                    <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#475156] block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, email: e.target.value })
                          }
                          placeholder="user@example.com"
                          className="w-full border border-[#E4E7E9] rounded-sm p-2 text-sm outline-none focus:border-[#FA8232]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#475156] block mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, password: e.target.value })
                          }
                          placeholder="••••••••"
                          className="w-full border border-[#E4E7E9] rounded-sm p-2 text-sm outline-none focus:border-[#FA8232]"
                        />
                      </div>
                      {loginError && (
                        <p className="text-xs text-red-500">{loginError}</p>
                      )}
                      <button
                        type="submit"
                        className="bg-[#FA8232] text-white py-2 rounded-sm text-sm font-pub font-bold hover:bg-[#e07228] transition-colors mt-1"
                      >
                        Sign In
                      </button>
                    </form>
                    <div className="mt-4 pt-3 border-t border-[#E4E7E9] text-center">
                      <Link
                        to="/signup"
                        onClick={() => setUserDropdownOpen(false)}
                        className="text-xs text-[#2DA5F3] font-semibold hover:underline"
                      >
                        Don&apos;t have an account? Create one
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Sub Navigation Bar */}
      <nav className="hidden md:block bg-white border-b border-[#E4E7E9] sticky top-0 z-30 shadow-xs">
        <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Category Dropdown */}
            <div ref={catMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`flex items-center gap-3 px-5 h-14 font-pub font-semibold text-sm transition-colors ${
                  categoryDropdownOpen
                    ? "bg-[#FA8232] text-white"
                    : "bg-[#F2F4F5] text-[#191C1F] hover:bg-[#FA8232] hover:text-white"
                }`}
              >
                <span>All Categories</span>
                <MdOutlineKeyboardArrowDown
                  className={`text-lg transition-transform ${
                    categoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Category Mega Dropdown */}
              {categoryDropdownOpen && (
                <div className="absolute left-0 top-full w-64 bg-white border border-[#E4E7E9] shadow-2xl rounded-b-md z-[9999] py-2 animate-fadeIn">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm font-pub text-[#475156] hover:bg-[#F2F4F5] hover:text-[#FA8232] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[11px] text-[#929FA5]">
                        ({cat.productCount})
                      </span>
                    </Link>
                  ))}
                  <div className="border-t border-[#E4E7E9] mt-1 pt-1">
                    <Link
                      to="/shop"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-pub font-bold text-[#2DA5F3] hover:underline"
                    >
                      View All Products &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links Menu */}
            <div className="flex items-center gap-6 text-sm font-pub">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-[#FA8232] font-semibold"
                      : "text-[#5F6C72] hover:text-[#191C1F]"
                  }`
                }
              >
                Shop All
              </NavLink>

              <NavLink
                to="/trackorder"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-[#FA8232] font-semibold"
                      : "text-[#5F6C72] hover:text-[#191C1F]"
                  }`
                }
              >
                <PiMapPinLine size={18} className="text-[#FA8232]" />
                Track Order
              </NavLink>

              <NavLink
                to="/compare"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-[#FA8232] font-semibold"
                      : "text-[#5F6C72] hover:text-[#191C1F]"
                  }`
                }
              >
                <FaRepeat size={14} className="text-[#2DA5F3]" />
                Compare
              </NavLink>

              <NavLink
                to="/customersupport"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-[#FA8232] font-semibold"
                      : "text-[#5F6C72] hover:text-[#191C1F]"
                  }`
                }
              >
                <PiHeadphones size={18} className="text-[#2DA5F3]" />
                Customer Support
              </NavLink>

              <NavLink
                to="/info"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? "text-[#FA8232] font-semibold"
                      : "text-[#5F6C72] hover:text-[#191C1F]"
                  }`
                }
              >
                <PiInfo size={18} className="text-[#77878F]" />
                Need Help
              </NavLink>
            </div>

            {/* Helpline */}
            <div className="flex items-center gap-2">
              <FiPhoneCall className="text-[#191C1F]" size={18} />
              <a
                href="tel:+12025550104"
                className="font-pub text-sm font-semibold text-[#191C1F] hover:text-[#FA8232] transition-colors"
              >
                +1-202-555-0104
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      <SearchOverlay
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
