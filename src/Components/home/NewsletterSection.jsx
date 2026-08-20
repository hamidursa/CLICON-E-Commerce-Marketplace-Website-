import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useToast } from "../../context/ToastContext";
import NewStimg1 from "../../assets/Newsletter/img1.png";
import NewStimg2 from "../../assets/Newsletter/img2.png";
import NewStimg3 from "../../assets/Newsletter/img3.png";
import NewStimg4 from "../../assets/Newsletter/img4.png";
import NewStimg5 from "../../assets/Newsletter/img5.png";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    showToast("Thank you for subscribing to our newsletter!", "success");
    setEmail("");
  };

  return (
    <section className="bg-[#1B6392] py-12 sm:py-16 text-white font-pub">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h2 className="font-pub font-bold text-2xl sm:text-3xl md:text-4xl text-white">
          Subscribe to our newsletter
        </h2>
        <p className="max-w-md mt-3 font-pub text-sm sm:text-base text-[#D4E4EE] leading-relaxed">
          Get exclusive discounts, new product drops, and tech updates straight to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="w-full max-w-[580px] mt-6 sm:mt-8 bg-white p-2 rounded-md shadow-xl flex flex-col sm:flex-row items-center gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="w-full px-4 py-2.5 text-[#191C1F] text-sm font-pub outline-none placeholder:text-[#77878F]"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="w-full sm:w-auto shrink-0 bg-[#FA8232] hover:bg-[#e07228] text-white font-pub font-bold text-sm px-6 py-3 rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Subscribe</span>
            <FaArrowRight size={12} />
          </button>
        </form>

        {/* Brand Partners */}
        <div className="w-full max-w-[640px] mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75">
          <img src={NewStimg1} alt="Google" className="h-6 sm:h-8 w-auto object-contain brightness-0 invert" />
          <img src={NewStimg2} alt="Amazon" className="h-6 sm:h-8 w-auto object-contain brightness-0 invert" />
          <img src={NewStimg3} alt="Philips" className="h-6 sm:h-8 w-auto object-contain brightness-0 invert" />
          <img src={NewStimg4} alt="Toshiba" className="h-6 sm:h-8 w-auto object-contain brightness-0 invert" />
          <img src={NewStimg5} alt="Samsung" className="h-6 sm:h-8 w-auto object-contain brightness-0 invert" />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
