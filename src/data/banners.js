// src/data/banners.js
// Hero carousel data referencing existing assets

import Header_Img1 from "../assets/Header/img1.png";
import Header_Img2 from "../assets/Header/img2.png";
import Header_Img3 from "../assets/Header/img3.png";
import Header_Img4 from "../assets/Header/img4.png";

export const heroBanners = [
  {
    id: 1,
    tag: "THE BEST PLACE TO PLAY",
    tagColor: "#2DA5F3",
    title: "Xbox Consoles",
    subtitle: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
    price: "$299",
    priceStyle: "badge", // 'badge' = circle price badge
    image: Header_Img1,
    bg: "#F2F4F5",
    textColor: "#191C1F",
    cta: { label: "Shop Now", to: "/shop" },
  },
  {
    id: 2,
    tag: "Summer Sales",
    tagColor: "#EBC80C",
    title: "New Google Pixel 6 Pro",
    subtitle: "Google Pixel 6 Pro: powerful AI chip, pro-level camera, and sleek design for seamless performance.",
    price: "29% OFF",
    priceStyle: "label",
    image: Header_Img4,
    bg: "#191C1F",
    textColor: "#FFFFFF",
    cta: { label: "Shop Now", to: "/shop" },
  },
  {
    id: 3,
    tag: null,
    tagColor: null,
    title: "Xiaomi FlipBuds Pro",
    subtitle: "Xiaomi FlipBuds Pro: premium true wireless earbuds with active noise cancellation and immersive sound.",
    price: "$299",
    priceStyle: "badge",
    image: Header_Img3,
    bg: "#F2F4F5",
    textColor: "#191C1F",
    cta: { label: "Shop Now", to: "/shop" },
  },
];

export const sideBanners = [
  {
    id: 1,
    tag: "Summer Sales",
    tagColor: "#EBC80C",
    title: "New Google Pixel 6 Pro",
    discount: "29% OFF",
    image: Header_Img2,
    bg: "#191C1F",
    cta: { label: "Shop Now", to: "/shop" },
  },
  {
    id: 2,
    tag: null,
    title: "Xiaomi FlipBuds Pro",
    price: "$299 USD",
    image: Header_Img3,
    bg: "#F2F4F5",
    cta: { label: "Shop Now", to: "/shop" },
  },
];
