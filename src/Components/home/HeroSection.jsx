import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { heroBanners, sideBanners } from "../../data/banners";

/**
 * Hero Banner Section with autoplay carousel and promo side cards
 */
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroBanners.length) % heroBanners.length
    );

  const activeSlide = heroBanners[currentSlide];

  return (
    <section className="pt-4 sm:pt-6">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Main Slider (8 Cols) */}
          <div className="lg:col-span-8 relative rounded-md overflow-hidden min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex items-center shadow-xs">
            {/* Slide Content */}
            <div
              className="w-full h-full p-6 sm:p-10 md:p-14 flex flex-col justify-center transition-colors duration-500 relative"
              style={{ backgroundColor: activeSlide.bg }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-6 z-10">
                {/* Text Content */}
                <div className="sm:col-span-7 flex flex-col items-start">
                  {activeSlide.tag && (
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-6 h-0.5"
                        style={{ backgroundColor: activeSlide.tagColor }}
                      />
                      <span
                        className="font-pub font-bold text-xs uppercase tracking-wider"
                        style={{ color: activeSlide.tagColor }}
                      >
                        {activeSlide.tag}
                      </span>
                    </div>
                  )}

                  <h2
                    className="font-pub font-bold text-2xl sm:text-4xl md:text-5xl leading-tight"
                    style={{ color: activeSlide.textColor }}
                  >
                    {activeSlide.title}
                  </h2>

                  <p
                    className="mt-3 font-pub text-sm sm:text-base leading-relaxed max-w-md opacity-90"
                    style={{ color: activeSlide.textColor }}
                  >
                    {activeSlide.subtitle}
                  </p>

                  <Link
                    to={activeSlide.cta.to}
                    className="mt-6 inline-flex items-center gap-2.5 bg-[#FA8232] hover:bg-[#e07228] text-white font-pub font-bold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-xs shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>{activeSlide.cta.label}</span>
                    <FaArrowRight size={14} />
                  </Link>
                </div>

                {/* Image & Price Badge */}
                <div className="sm:col-span-5 relative flex items-center justify-center">
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    className="max-h-[220px] sm:max-h-[300px] object-contain transition-transform duration-500 hover:scale-105"
                  />
                  {activeSlide.priceStyle === "badge" ? (
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2DA5F3] text-white font-pub font-bold text-base sm:text-lg flex items-center justify-center shadow-lg animate-pulse">
                      {activeSlide.price}
                    </div>
                  ) : (
                    <div className="absolute top-0 right-2 bg-[#EFD33D] text-[#191C1F] font-pub font-bold text-xs sm:text-sm px-3 py-1.5 rounded-xs shadow-md">
                      {activeSlide.price}
                    </div>
                  )}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="absolute bottom-4 left-6 sm:left-10 flex items-center gap-2 z-20">
                {heroBanners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentSlide === i
                        ? "w-8 bg-[#FA8232]"
                        : "w-2.5 bg-[#ADB7BC]/60 hover:bg-[#ADB7BC]"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="absolute right-4 bottom-4 flex items-center gap-2 z-20">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-[#191C1F] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-[#191C1F] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Side Promo Banners (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6">
            {/* Top Side Banner */}
            <div className="flex-1 bg-[#191C1F] text-white rounded-md p-6 flex items-center justify-between relative overflow-hidden shadow-xs group">
              <div className="flex flex-col items-start z-10 max-w-[170px]">
                <span className="text-[#EBC80C] text-xs font-pub font-bold uppercase tracking-wider">
                  {sideBanners[0].tag}
                </span>
                <h3 className="font-pub font-bold text-lg sm:text-xl text-white mt-1 leading-snug">
                  {sideBanners[0].title}
                </h3>
                <Link
                  to={sideBanners[0].cta.to}
                  className="mt-4 inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#e07228] text-white text-xs font-pub font-bold px-4 py-2 rounded-xs transition-all"
                >
                  Shop Now <FaArrowRight size={10} />
                </Link>
              </div>

              <div className="relative shrink-0 w-32 h-32 flex items-center justify-center">
                <img
                  src={sideBanners[0].image}
                  alt=""
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-0 right-0 bg-[#EFD33D] text-[#191C1F] text-[10px] font-pub font-bold px-2 py-0.5 rounded-xs">
                  {sideBanners[0].discount}
                </span>
              </div>
            </div>

            {/* Bottom Side Banner */}
            <div className="flex-1 bg-[#F2F4F5] text-[#191C1F] rounded-md p-6 flex items-center justify-between relative overflow-hidden shadow-xs group">
              <div className="relative shrink-0 w-28 h-28 flex items-center justify-center">
                <img
                  src={sideBanners[1].image}
                  alt=""
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex flex-col items-start z-10 max-w-[170px]">
                <h3 className="font-pub font-bold text-lg sm:text-xl text-[#191C1F] leading-snug">
                  {sideBanners[1].title}
                </h3>
                <span className="text-[#2DA5F3] font-pub font-bold text-base mt-1">
                  {sideBanners[1].price}
                </span>
                <Link
                  to={sideBanners[1].cta.to}
                  className="mt-4 inline-flex items-center gap-2 bg-[#FA8232] hover:bg-[#e07228] text-white text-xs font-pub font-bold px-4 py-2 rounded-xs transition-all"
                >
                  Shop Now <FaArrowRight size={10} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
