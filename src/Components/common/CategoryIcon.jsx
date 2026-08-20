import React from "react";
import {
  FiMonitor,
  FiSmartphone,
  FiHeadphones,
  FiWatch,
  FiCamera,
  FiTv,
} from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";

/**
 * Clean SVG/React-Icon renderer for categories — replaces all emojis
 * @param {string} slug - Category slug
 * @param {number} [size=18]
 * @param {string} [className=""]
 */
const CategoryIcon = ({ slug, size = 18, className = "" }) => {
  switch (slug) {
    case "computers":
      return <FiMonitor size={size} className={className} />;
    case "smartphones":
      return <FiSmartphone size={size} className={className} />;
    case "headphones":
      return <FiHeadphones size={size} className={className} />;
    case "accessories":
      return <FiWatch size={size} className={className} />;
    case "cameras":
      return <FiCamera size={size} className={className} />;
    case "tv-home":
      return <FiTv size={size} className={className} />;
    case "gaming":
      return <IoGameControllerOutline size={size} className={className} />;
    default:
      return <FiMonitor size={size} className={className} />;
  }
};

export default CategoryIcon;
