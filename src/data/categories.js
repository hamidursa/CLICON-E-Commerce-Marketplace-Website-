// src/data/categories.js

import CatgImg1 from "../assets/Categorys/img1.png";
import CatgImg2 from "../assets/Categorys/img2.png";
import CatgImg3 from "../assets/Categorys/img3.png";
import CatgImg4 from "../assets/Categorys/img4.png";
import CatgImg5 from "../assets/Categorys/img5.png";
import CatgImg6 from "../assets/Categorys/img6.png";

export const categories = [
  {
    id: 1,
    slug: "computers",
    name: "Computer & Laptop",
    description:
      "Explore the latest laptops, desktops, and workstations from top brands like Apple, Dell, HP, ASUS, and LG.",
    image: CatgImg1,
    productCount: 8,
    featured: true,
  },
  {
    id: 2,
    slug: "smartphones",
    name: "SmartPhone",
    description:
      "Discover the newest smartphones including iPhone, Samsung Galaxy, Google Pixel, and more.",
    image: CatgImg2,
    productCount: 5,
    featured: true,
  },
  {
    id: 3,
    slug: "headphones",
    name: "Headphones",
    description:
      "Premium audio experiences with the finest headphones and earbuds from Sony, Bose, Apple, and Xiaomi.",
    image: CatgImg3,
    productCount: 4,
    featured: true,
  },
  {
    id: 4,
    slug: "accessories",
    name: "Accessories",
    description:
      "Everything you need: watches, keyboards, mice, tablets, power banks, and speakers.",
    image: CatgImg4,
    productCount: 10,
    featured: true,
  },
  {
    id: 5,
    slug: "cameras",
    name: "Camera & Photo",
    description:
      "Professional-grade cameras and photography equipment from Canon, Sony, and Nikon.",
    image: CatgImg5,
    productCount: 1,
    featured: true,
  },
  {
    id: 6,
    slug: "tv-home",
    name: "TV & Home",
    description:
      "Transform your living room with 4K OLED and QLED TVs from Samsung and Sony.",
    image: CatgImg6,
    productCount: 2,
    featured: true,
  },
  {
    id: 7,
    slug: "gaming",
    name: "Gaming Console",
    description:
      "Level up your gaming with consoles, controllers, and accessories from Xbox, PlayStation, and Nintendo.",
    image: CatgImg1,
    productCount: 2,
    featured: false,
  },
];

// Nav-specific category list (for navbar dropdown)
export const navCategories = [
  { label: "Computer & Laptop", slug: "computers" },
  { label: "SmartPhone", slug: "smartphones" },
  { label: "Headphones", slug: "headphones" },
  { label: "Accessories", slug: "accessories" },
  { label: "Camera & Photo", slug: "cameras" },
  { label: "TV & Home", slug: "tv-home" },
  { label: "Gaming Console", slug: "gaming" },
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);
