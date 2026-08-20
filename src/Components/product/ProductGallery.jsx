import React, { useState } from "react";

/**
 * Reusable Product Image Gallery with thumbnail selector and main zoom/view
 * @param {Array<string>} images
 * @param {string} title
 */
const ProductGallery = ({ images = [], title = "Product image" }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const galleryImages = images.length > 0 ? images : ["https://via.placeholder.com/400x400/F2F4F5/ADB7BC?text=No+Image"];
  const currentImage = galleryImages[selectedIndex] || galleryImages[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image View */}
      <div 
        className="relative bg-[#F2F4F5] border border-[#E4E7E9] rounded-md h-[320px] sm:h-[400px] md:h-[460px] flex items-center justify-center p-4 overflow-hidden group cursor-crosshair"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={currentImage}
          alt={`${title} - View ${selectedIndex + 1}`}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
            isZoomed ? "scale-125" : "scale-100"
          }`}
        />
      </div>

      {/* Thumbnail Bar */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`h-20 sm:h-24 bg-[#F2F4F5] rounded-sm border-2 p-1.5 transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center ${
                selectedIndex === idx
                  ? "border-[#FA8232] shadow-sm ring-1 ring-[#FA8232]"
                  : "border-[#E4E7E9] hover:border-[#2DA5F3]"
              }`}
              aria-label={`Select image ${idx + 1}`}
            >
              <img
                src={img}
                alt=""
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
