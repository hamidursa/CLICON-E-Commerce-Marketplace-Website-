import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsReddit,
} from "react-icons/bs";
import {
  FaPinterest,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const AnnouncementBar = () => {
  return (
    <div className="bg-[#1B6392] text-white font-pub text-xs sm:text-[13px] border-b border-[#5E91B2] py-2.5">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-normal text-center sm:text-left text-[#E4E7E9]">
          Welcome to Clicon online eCommerce store. Free shipping on orders over $50!
        </p>

        <div className="flex items-center gap-4">
          <span className="text-[#ADB7BC] hidden md:inline">Follow Us:</span>
          <div className="flex items-center gap-3 text-sm">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-[#E4E7E9] hover:text-white transition-colors"
            >
              <BsFacebook />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
              className="text-[#E4E7E9] hover:text-white transition-colors"
            >
              <FaPinterest />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X Twitter"
              className="text-[#E4E7E9] hover:text-white transition-colors"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.reddit.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Reddit"
              className="text-[#E4E7E9] hover:text-white transition-colors"
            >
              <BsReddit />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-[#E4E7E9] hover:text-white transition-colors"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-[#E4E7E9] hover:text-white transition-colors"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
