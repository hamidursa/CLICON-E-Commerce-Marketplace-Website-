import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiX, FiPhoneCall, FiChevronRight } from "react-icons/fi";
import { PiMapPinLine, PiHeadphones, PiInfo } from "react-icons/pi";
import { FaRepeat } from "react-icons/fa6";
import { categories } from "../../data/categories";

/**
 * Slide-in Mobile Drawer Navigation
 */
const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-[300px] sm:w-[340px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInLeft overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#1B6392] text-white border-b border-[#5E91B2]">
          <span className="font-pub font-bold text-lg tracking-wide">Menu</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Categories Section */}
        <div className="p-4 border-b border-[#E4E7E9]">
          <span className="text-xs font-pub font-bold text-[#77878F] uppercase tracking-wider block mb-3">
            Shop by Category
          </span>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={onClose}
                className="flex items-center justify-between py-2 px-2.5 rounded-sm hover:bg-[#F2F4F5] text-[#191C1F] text-sm font-pub font-medium transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                <FiChevronRight size={14} className="text-[#ADB7BC]" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="p-4 border-b border-[#E4E7E9]">
          <span className="text-xs font-pub font-bold text-[#77878F] uppercase tracking-wider block mb-3">
            Quick Links
          </span>
          <div className="flex flex-col gap-1 text-sm font-pub">
            <NavLink
              to="/shop"
              onClick={onClose}
              className={({ isActive }) =>
                `py-2 px-2.5 rounded-sm flex items-center justify-between ${
                  isActive ? "bg-[#FA8232]/10 text-[#FA8232] font-semibold" : "text-[#191C1F] hover:bg-[#F2F4F5]"
                }`
              }
            >
              Browse All Products
            </NavLink>
            <NavLink
              to="/trackorder"
              onClick={onClose}
              className="py-2 px-2.5 rounded-sm flex items-center gap-2.5 text-[#191C1F] hover:bg-[#F2F4F5]"
            >
              <PiMapPinLine size={18} className="text-[#FA8232]" />
              Track Order
            </NavLink>
            <NavLink
              to="/compare"
              onClick={onClose}
              className="py-2 px-2.5 rounded-sm flex items-center gap-2.5 text-[#191C1F] hover:bg-[#F2F4F5]"
            >
              <FaRepeat size={16} className="text-[#2DA5F3]" />
              Compare Products
            </NavLink>
            <NavLink
              to="/customersupport"
              onClick={onClose}
              className="py-2 px-2.5 rounded-sm flex items-center gap-2.5 text-[#191C1F] hover:bg-[#F2F4F5]"
            >
              <PiHeadphones size={18} className="text-[#2DA5F3]" />
              Customer Support
            </NavLink>
            <NavLink
              to="/info"
              onClick={onClose}
              className="py-2 px-2.5 rounded-sm flex items-center gap-2.5 text-[#191C1F] hover:bg-[#F2F4F5]"
            >
              <PiInfo size={18} className="text-[#77878F]" />
              Need Help & FAQs
            </NavLink>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="mt-auto p-4 bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1B6392]/10 text-[#1B6392] flex items-center justify-center">
              <FiPhoneCall size={18} />
            </div>
            <div>
              <p className="text-xs text-[#77878F]">Customer Service</p>
              <a
                href="tel:+12025550104"
                className="text-sm font-pub font-bold text-[#191C1F] hover:text-[#FA8232]"
              >
                +1-202-555-0104
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
