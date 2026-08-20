import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Banner_Img1 from "../../assets/Banner/img1.png";
import Banner_Img2 from "../../assets/Banner/img2.png";

/**
 * Promotional Dual Banner Section
 */
const PromoBanner = () => {
  return (
    <section className="py-8 sm:py-12">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#F2F4F5] rounded-md p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex flex-col items-start max-w-[280px]">
              <span className="bg-[#2DA5F3] text-white text-xs font-pub font-bold px-3 py-1 rounded-2xs uppercase tracking-wider">
                Introducing
              </span>
              <h3 className="font-pub font-bold text-2xl sm:text-3xl text-[#191C1F] mt-3 leading-tight">
                New Apple Homepod Mini
              </h3>
              <p className="font-pub text-sm text-[#475156] mt-2">
                Jam-packed with innovation, HomePod mini delivers unexpectedly big sound.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#e07228] text-white font-pub font-bold text-sm px-6 py-2.5 rounded-xs transition-all shadow-xs"
              >
                Shop Now <FaArrowRight size={12} />
              </Link>
            </div>

            <div className="shrink-0 w-36 sm:w-44 flex items-center justify-center">
              <img
                src={Banner_Img1}
                alt="Apple Homepod Mini"
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#191C1F] text-white rounded-md p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex flex-col items-start max-w-[280px] z-10">
              <span className="bg-[#EFD33D] text-[#191C1F] text-xs font-pub font-bold px-3 py-1 rounded-2xs uppercase tracking-wider">
                Introducing New
              </span>
              <h3 className="font-pub font-bold text-2xl sm:text-3xl text-white mt-3 leading-tight">
                Xiaomi Mi 11 Ultra
              </h3>
              <p className="font-pub text-sm text-[#ADB7BC] mt-2">
                Groundbreaking camera system and unmatched flagship speed.
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#e07228] text-white font-pub font-bold text-sm px-6 py-2.5 rounded-xs transition-all shadow-xs"
              >
                Shop Now <FaArrowRight size={12} />
              </Link>
            </div>

            <div className="relative shrink-0 w-36 sm:w-44 flex items-center justify-center">
              <img
                src={Banner_Img2}
                alt="Xiaomi Mi 11 Ultra"
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
              />
              <div className="absolute -top-2 right-0 w-16 h-16 rounded-full bg-[#2DA5F3] text-white font-pub font-bold text-base flex items-center justify-center shadow-lg">
                $590
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
