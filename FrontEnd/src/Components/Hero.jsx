import React from "react";
import Banner from "../Images/bannerCover.png";
import brand from "../Images/Brandlogo.jpg";
import phoneBrand from "../Images/phonelogo.jpg";

export default function Hero() {
  return (
    <div>
      {/* First Segment */}
      <div className="bg-[#F2F0F1] grid grid-cols-1 sm:grid-cols-2">
        <div className="p-[20px] sm:p-[80px]">
          <h1 className="text-3xl sm:text-7xl font-bold pb-1 text-[#BE3756]">
            FIND PRODUCTS THAT MATCH YOUR STYLE
          </h1>
          <p className="text-gray-600 pb-5 text-xs sm:text-[16px]">
            Explore our diverse collection of products, carefully curated to fit
            your needs and unique preferences.
          </p>
          <button className="bg-[#BE3756] text-white py-3 px-[120px] sm:px-10 rounded-full transform transition-transform duration-300 hover:-translate-y-1 mb-7">
            Shop Now
          </button>
          <div className="grid sm:grid-cols-3 grid-cols-2">
            <div className="border-r border-gray-400 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#BE3756]">
                200+
              </p>
              <p className="text-gray-600 text-xs sm:text-[16px]">
                International Brands
              </p>
            </div>
            <div className="sm:border-r border-gray-400 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-[#BE3756]">
                2000+
              </p>
              <p className="text-gray-600 text-xs sm:text-[16px]">
                High Quality Products
              </p>
            </div>
            <div className="col-span-2 text-center sm:col-span-1">
              <p className="text-2xl sm:text-3xl font-bold text-[#BE3756]">
                30,000+
              </p>
              <p className="text-gray-600 text-xs sm:text-[16px]">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
        {/* Second Segment */}
        <div>
          <img
            src={Banner}
            className="sm:h-[600px] ps-[50px] object-cover sm:w-[600px]"
          />
        </div>
      </div>
    </div>
  );
}
