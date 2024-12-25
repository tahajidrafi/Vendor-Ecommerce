import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCog,
  faHouse,
  faImage,
  faPhotoFilm,
  faReceipt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import MainDashboard from "../Components/Admin_Dashboard/mainDashboard";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import Banner from "../Components/Admin_Dashboard/Banner";
import Ads from "../Components/Admin_Dashboard/Ads";
import PromoCode from "../Components/Admin_Dashboard/PromoCode";
import Products from "../Components/Admin_Dashboard/Products";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: faHouse },
    { id: "banner", label: "Banner", icon: faImage },
    { id: "ads", label: "Ads", icon: faPhotoFilm },
    { id: "promo-code", label: "Promo Code", icon: faReceipt },
    { id: "products", label: "Products", icon: faBox },
    { id: "users", label: "Users", icon: faUser },
  ];

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-[18%] bg-white text-gray-700 shadow-md flex flex-col p-4">
        <img
          src={logo}
          alt="logo"
          className="w-[250px] h-[74px] text-center cursor-pointer"
          onClick={() => setActiveTab("dashboard")}
        />
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 my-1 rounded-lg ${
              activeTab === tab.id
                ? "bg-[#FCDAE1] text-red-600 shadow-inner"
                : "hover:bg-[#FCDAE1] hover:text-black"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <FontAwesomeIcon icon={tab.icon} size="lg" />
            <span className="text-sm font-medium">{tab.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-[82%] bg-[#F2F0F1]">
        {activeTab === "dashboard" && <MainDashboard />}
        {activeTab === "banner" && <Banner />}
        {activeTab === "ads" && <Ads />}
        {activeTab === "promo-code" && <PromoCode />}
        {activeTab === "products" && <Products />}
      </div>
    </div>
  );
};

export default AdminDashboard;
