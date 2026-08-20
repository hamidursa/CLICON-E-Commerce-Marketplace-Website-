import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";

/**
 * Category Grid section on homepage with dynamic links to `/category/:slug`
 */
const CategorySection = () => {
  return (
    <section className="py-10 sm:py-14">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-pub font-bold text-2xl sm:text-3xl text-[#191C1F]">
            Shop with Categories
          </h2>
          <p className="font-pub text-sm text-[#77878F] mt-1.5">
            Discover top-tier electronics across curated categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-white border border-[#E4E7E9] rounded-md p-4 flex flex-col items-center text-center hover:border-[#FA8232] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center p-3 mb-3 group-hover:bg-[#FFF3EB] transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-pub font-semibold text-xs sm:text-sm text-[#191C1F] group-hover:text-[#FA8232] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[11px] font-pub text-[#77878F] mt-0.5">
                {cat.productCount} Products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
