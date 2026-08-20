// src/components/common/Modal.jsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Accessible modal dialog
 * @param {boolean} isOpen
 * @param {Function} onClose
 * @param {string} [title]
 * @param {string} [size] - "sm"|"md"|"lg"|"xl"
 */
const Modal = ({ isOpen, onClose, title, children, size = "md", className = "" }) => {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll when modal open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  const sizeMap = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-black/50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog"}
    >
      <div
        className={`bg-white rounded-md shadow-2xl w-full ${sizeMap[size] || sizeMap.md} max-h-[90vh] overflow-y-auto ${className}`}
      >
        {/* Modal Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E7E9]">
            <h2 className="font-pub font-semibold text-[18px] text-[#191C1F]">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F2F4F5] transition-colors text-[#77878F] hover:text-[#191C1F]"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className={title ? "p-6" : ""}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
