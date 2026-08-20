import React from "react";
import { Link } from "react-router-dom";
import Container from "../Layouts/Container";
import Footer_Logo from "../assets/logo2.png";
import GooglePlay from "../assets/Google-play.png";
import Apple from "../assets/Apple.png";
import { footerLinks } from "../data/navigation";

const Footer = () => {
  return (
    <footer className="bg-[#191C1F] text-white pt-12 sm:pt-16 pb-8 border-t border-[#303639]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 pb-12 border-b border-[#303639]">
          {/* Col 1: Brand Info (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={Footer_Logo} alt="CLICON" className="w-8 h-8 object-contain" />
              <span className="font-pub font-bold text-2xl tracking-tight text-white">
                CLICON
              </span>
            </Link>

            <div className="flex flex-col gap-2 text-sm font-pub text-[#ADB7BC]">
              <span className="text-xs text-[#77878F]">Customer Support:</span>
              <a
                href="tel:+12025550104"
                className="text-base font-semibold text-white hover:text-[#FA8232] transition-colors"
              >
                (629) 555-0129
              </a>
              <p className="mt-1 leading-relaxed max-w-[260px]">
                4517 Washington Ave. Manchester, Kentucky 39495
              </p>
              <a
                href="mailto:support@clicon.com"
                className="text-white hover:text-[#FA8232] transition-colors font-medium mt-1"
              >
                support@clicon.com
              </a>
            </div>
          </div>

          {/* Col 2: Top Categories (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-pub font-semibold text-sm sm:text-base text-white mb-4 uppercase tracking-wider">
              Top Category
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm font-pub text-[#929FA5]">
              {footerLinks.topCategories.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-pub font-semibold text-sm sm:text-base text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm font-pub text-[#929FA5]">
              {footerLinks.quickLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: App Download & Tags (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <h3 className="font-pub font-semibold text-sm sm:text-base text-white mb-4 uppercase tracking-wider">
                Download App
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#303639] hover:bg-[#3d4549] px-4 py-2.5 rounded-sm transition-colors"
                >
                  <img src={GooglePlay} alt="" className="w-6 h-6 object-contain" />
                  <div className="text-left">
                    <span className="text-[10px] text-[#ADB7BC] block leading-none">
                      Get it now
                    </span>
                    <span className="text-xs font-semibold text-white block mt-0.5">
                      Google Play
                    </span>
                  </div>
                </a>

                <a
                  href="https://apple.com/app-store"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#303639] hover:bg-[#3d4549] px-4 py-2.5 rounded-sm transition-colors"
                >
                  <img src={Apple} alt="" className="w-6 h-6 object-contain" />
                  <div className="text-left">
                    <span className="text-[10px] text-[#ADB7BC] block leading-none">
                      Get it now
                    </span>
                    <span className="text-xs font-semibold text-white block mt-0.5">
                      App Store
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-pub font-semibold text-sm sm:text-base text-white mb-3 uppercase tracking-wider">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {footerLinks.popularTags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/shop?search=${encodeURIComponent(tag)}`}
                    className="text-xs font-pub text-[#ADB7BC] border border-[#303639] hover:border-[#FA8232] hover:text-[#FA8232] px-2.5 py-1 rounded-2xs transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-pub text-[#77878F]">
          <p>© {new Date().getFullYear()} Clicon E-Commerce Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/info" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/info" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link to="/customersupport" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
