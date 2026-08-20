# CLICON — Modern Electronics & Technology Marketplace

A high-performance, component-based, production-grade e-commerce frontend architecture built with **React 19**, **Vite 7**, and **Tailwind CSS v4**.

---

## 📌 Overview

**CLICON** is a modern consumer electronics e-commerce platform designed to provide a fast, responsive, and intuitive shopping experience. It features a scalable component hierarchy, centralized data architecture, persistent shopping cart and wishlist systems, multi-facet product filtering, instant search suggestions, quick view modals, and accessible UI workflows.

---

## ✨ Features

### 🛍️ Product Catalog & Discovery
- **Centralized Data Layer**: 30+ curated electronics products with comprehensive specifications, pricing, brand tags, categories, and inventory metrics.
- **Dynamic Category Pages**: Dynamic `/category/:slug` routes rendering category headers, filtered catalogs, and sibling category navigation.
- **Dynamic Product Details**: Product views with high-resolution image gallery, zoom capabilities, technical specifications table, stock indicators, and related product recommendations.
- **Quick View Modal**: Inspect product details, select quantities, add items to cart, or toggle wishlist items instantly from any grid without page reload.
- **Instant Search with Auto-Complete**: Desktop & full-screen mobile search experience matching product names, brands, categories, and tags with real-time suggestion overlays.

### 🛒 Shopping Cart & Wishlist
- **Persistent Cart System**: Full `localStorage` persistence with reactive state management, quantity increment/decrement, line-item removal, and batch clearing.
- **Slide-in Cart Drawer**: Quick slide-out drawer providing instantaneous cart previews and frictionless navigation to checkout.
- **Dynamic Coupon & Promo Codes**: Built-in promo validation (`CLICON10`, `YS143`, `SUMMER20`) with instant savings calculations.
- **Order Breakdown**: Automatic calculation of subtotals, tiered free-shipping rules, dynamic tax estimations, and total price.
- **Wishlist System**: One-click heart toggle across all product cards with count badges and batch "Add All to Cart" action.

### 🧭 Navigation & UX Architecture
- **Responsive Header**: Sticky top navigation bar, announcements banner, live search, wishlist & cart badges, and user account dropdown.
- **Mobile Menu Drawer**: Touch-optimized slide-in drawer with categorized navigation, direct shop links, and customer service hotlines.
- **Toast Notification System**: Lightweight, accessible toast notifications providing real-time user feedback for cart additions, wishlist updates, and form submissions.
- **Multi-Facet Shop Filtering**: Filter by category, price ranges, popular brands, stock availability, and sort by price, rating, newest, or best discounts.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (Feather, FontAwesome, Bootstrap, Phosphor, Ionicons)
- **State Management**: React Context (`CartContext`, `WishlistContext`, `ToastContext`, `ProductContext`) + `localStorage`

---

## 📁 Project Structure

```
CLICON-E-Commerce-Marketplace-Website-/
├── public/
│   ├── fav.icon
│   └── robots.txt
├── src/
│   ├── assets/                # Optimized imagery (banners, logos, partners, categories)
│   ├── components/
│   │   ├── cart/              # CartDrawer, CartItem, CartSummary, CouponInput, QuantitySelector
│   │   ├── common/            # Badge, Breadcrumb, Button, EmptyState, LoadingSpinner, Modal
│   │   ├── home/              # HeroSection, BenefitsBar, CategorySection, FeaturedProducts, PromoBanner, NewsletterSection
│   │   ├── layout/            # DefaultLayout
│   │   ├── navigation/        # AnnouncementBar, MobileMenu, Navbar, SearchBar, SearchOverlay
│   │   ├── product/           # ProductCard, ProductGallery, ProductGrid, ProductPrice, ProductRating, QuickViewModal, RelatedProducts
│   │   └── ui/                # FootList, FootTag, etc.
│   ├── context/
│   │   ├── CartContext.jsx      # Reactive shopping cart provider
│   │   ├── WishlistContext.jsx  # Reactive wishlist provider
│   │   ├── ToastContext.jsx     # Global notification toast provider
│   │   └── ProductContext.jsx   # Dual-compatible product data provider
│   ├── data/
│   │   ├── products.js          # Centralized product catalog (30+ electronics)
│   │   ├── categories.js        # Category definitions and slugs
│   │   ├── brands.js            # Brand catalog for multi-select filters
│   │   ├── banners.js           # Hero slider & promotional card data
│   │   └── navigation.js        # Links and navigation maps
│   ├── pages/
│   │   ├── Cart.jsx             # Shopping cart page
│   │   ├── Category/            # Dynamic CategoryPage.jsx
│   │   ├── CheckOut.jsx         # Checkout & payment processing flow
│   │   ├── Compare.jsx          # Product comparison matrix
│   │   ├── CustomerSupport.jsx  # Help desk & customer support
│   │   ├── Favorites.jsx        # Saved wishlist page
│   │   ├── Home.jsx             # Modular homepage layout
│   │   ├── Info.jsx             # Terms, Privacy & FAQs
│   │   ├── OrderSuccess.jsx     # Order confirmation screen
│   │   ├── ProductView.jsx      # Dynamic product showcase & specs
│   │   ├── Registration.jsx     # User sign-up & account onboarding
│   │   ├── Shop.jsx             # Multi-filter shop catalog
│   │   └── TrackOrder.jsx       # Real-time shipment tracker
│   ├── utils/
│   │   ├── formatPrice.js       # USD currency formatting helper
│   │   ├── filterProducts.js    # Multi-attribute filter logic
│   │   └── sortProducts.js      # Sorting algorithm utility
│   ├── index.css                # Tailwind directives, theme variables, and keyframe animations
│   └── main.jsx                 # Application entry point & router hierarchy
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/CLICON-E-Commerce-Marketplace-Website-.git

# Navigate into the project root
cd CLICON-E-Commerce-Marketplace-Website-

# Install dependencies
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🎯 Architecture Decisions

1. **Centralized Local Data Architecture**: Decoupled UI presentation from data sources. Adding, editing, or removing items from `src/data/products.js` updates all views, filters, and categories instantly without JSX modifications.
2. **Context-Driven State Isolation**: Separated cart, wishlist, and toast notification concerns into dedicated contexts (`CartContext`, `WishlistContext`, `ToastContext`), preventing unnecessary re-renders across unaffected trees.
3. **Atomic & Composite Components**: Every component has a single responsibility. Smaller primitives (`QuantitySelector`, `Badge`, `ProductPrice`) are composed into feature components (`ProductCard`, `CartItem`, `QuickViewModal`).
4. **Resilient Offline Operation**: Eliminates runtime dependencies on external third-party mockup APIs, ensuring 100% uptime and testability.

---

## 🔮 Future Enhancements

- **Backend Integration**: REST or GraphQL API connectivity with headless CMS or Node.js / Go backend.
- **User Authentication**: JWT/OAuth authentication with saved addresses, order histories, and profile customization.
- **Payment Gateways**: Stripe / PayPal SDK integration for real-time card charges and webhook verification.
- **Analytics & Tracking**: Event telemetry for cart additions, search queries, and conversion drop-offs.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
