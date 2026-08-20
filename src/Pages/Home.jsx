import React from "react";
import HeroSection from "../Components/home/HeroSection";
import BenefitsBar from "../Components/home/BenefitsBar";
import CategorySection from "../Components/home/CategorySection";
import FeaturedProducts from "../Components/home/FeaturedProducts";
import PromoBanner from "../Components/home/PromoBanner";
import NewsletterSection from "../Components/home/NewsletterSection";

const Home = () => {
  return (
    <div id="home" className="flex flex-col gap-2 animate-fadeIn">
      {/* 1. Hero Carousel + Promo Cards */}
      <HeroSection />

      {/* 2. Four Benefits Feature Bar */}
      <BenefitsBar />

      {/* 3. Shop by Category Grid */}
      <CategorySection />

      {/* 4. Featured Products Tabs & Side Card */}
      <FeaturedProducts />

      {/* 5. Dual Promotional Banner */}
      <PromoBanner />

      {/* 6. Newsletter Subscription Bar */}
      <NewsletterSection />
    </div>
  );
};

export default Home;
