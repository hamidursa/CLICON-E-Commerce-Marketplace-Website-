// src/components/common/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

/**
 * Reusable Breadcrumb component
 * @param {Array<{label: string, to?: string}>} items - breadcrumb items; last one is current page
 */
const Breadcrumb = ({ items = [] }) => {
  return (
    <nav
      className="bg-[#F2F4F5] py-4 sm:py-[18px]"
      aria-label="Breadcrumb"
    >
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1 flex-wrap">
          {/* Home link always first */}
          <li>
            <Link
              to="/"
              className="font-int text-[12px] sm:text-[13px] text-[#5F6C72] flex items-center gap-1 hover:text-[#2DA5F3] transition-colors duration-200"
              aria-label="Home"
            >
              <IoHomeOutline className="text-[14px]" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <li aria-hidden="true">
                  <MdKeyboardArrowRight className="text-[14px] text-[#ADB7BC]" />
                </li>
                <li>
                  {isLast || !item.to ? (
                    <span
                      className="font-int text-[12px] sm:text-[13px] text-[#2DA5F3] font-medium"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.to}
                      className="font-int text-[12px] sm:text-[13px] text-[#5F6C72] hover:text-[#2DA5F3] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
