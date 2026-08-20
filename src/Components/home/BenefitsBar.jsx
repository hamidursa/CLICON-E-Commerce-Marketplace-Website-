import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { PiTrophyLight, PiCreditCard, PiHeadphonesLight } from "react-icons/pi";

const benefits = [
  {
    icon: BsBoxSeam,
    title: "Fast Delivery",
    desc: "Delivery in 24 hours",
  },
  {
    icon: PiTrophyLight,
    title: "24 Hours Return",
    desc: "100% money-back guarantee",
  },
  {
    icon: PiCreditCard,
    title: "Secure Payment",
    desc: "Your money is safe",
  },
  {
    icon: PiHeadphonesLight,
    title: "Support 24/7",
    desc: "Live contact & assistance",
  },
];

/**
 * Clean, responsive 4-item benefits feature bar
 */
const BenefitsBar = () => {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="border border-[#E4E7E9] rounded-md bg-white p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#E4E7E9]">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-4 ${
                idx > 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#F2F4F5] text-[#191C1F] flex items-center justify-center shrink-0">
                <Icon size={26} />
              </div>
              <div>
                <h4 className="font-pub font-semibold text-sm text-[#191C1F]">
                  {item.title}
                </h4>
                <p className="font-pub text-xs text-[#5F6C72] mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsBar;
