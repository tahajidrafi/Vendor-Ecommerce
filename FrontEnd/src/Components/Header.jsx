import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faBarsStaggered,
  faXmark,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Images/logo.png";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Notification from "../utils/Notification";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginModalToggle = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleSignupModalToggle = () => {
    setShowSignupModal(!showSignupModal);
    setShowLoginModal(false);
  };

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    show: false,
  });

  const triggerNotification = (message, type) => {
    setNotification({ message: "", type: "", show: false }); // Reset first

    setTimeout(() => {
      setNotification({ message, type, show: true }); // Trigger notification
    }, 0);

    setTimeout(() => {
      setNotification({ message: "", type: "", show: false }); // Auto-hide notification
    }, 3000);
  };

  return (
    <header>
      {/* Banner Section */}
      <div className="bg-primary text-white text-sm py-2 flex justify-center relative">
        <div className="flex items-center gap-2">
          <span>Become a Seller & Start Selling Your Products.</span>
          <a
            href="/auth"
            className="font-bold underline hover:text-gray-200 transition-colors duration-200"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Main Header Section */}
      <div className="py-3 flex justify-between items-center px-4 md:px-8 bg-white shadow-md">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Company Logo"
            className="w-[150px] md:w-[200px] object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 mx-4 relative">
          <input
            type="text"
            placeholder="Search for products, brands, and more"
            className="w-full py-2 pl-4 pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none text-sm"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute right-3 text-gray-400 hover:text-primary cursor-pointer"
          />
        </div>

        {/* Desktop Icons (Cart and Profile) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon */}
          <div className="relative cursor-pointer">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-xl text-gray-600 hover:text-primary transition-colors duration-200"
            />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* User Icon */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLoginModalToggle}
          >
            <p className="text-gray-600 group-hover:text-primary text-sm font-medium transition-colors duration-200">
              Login
            </p>
            <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary transition-colors duration-200">
              <FontAwesomeIcon
                icon={faUser}
                className="text-lg text-gray-600 group-hover:text-white transition-colors duration-200"
              />
            </div>
          </div>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl text-gray-600 hover:text-primary cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faBarsStaggered}
            className="text-xl text-gray-600 hover:text-primary cursor-pointer"
            onClick={handleMenuToggle}
          />
        </div>
      </div>

      {/* Categories and Links */}
      <div className="py-3 flex justify-between items-center px-4 md:px-8 bg-white shadow-md border-t border-gray-200">
        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Categories with Icon */}
          <div className="flex items-center gap-2 cursor-pointer group hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-105 px-4 border-e-4">
            <FontAwesomeIcon
              icon={faTags}
              className="text-2xl text-gray-600 group-hover:text-primary transition-colors duration-300 ease-in-out"
            />
            <p className="text-gray-600 text-lg font-semibold group-hover:text-primary transition-colors duration-300 ease-in-out">
              Categories
            </p>
          </div>

          {/* Cart and Login */}
          <div className="flex items-center gap-4 ml-auto text-2xl">
            <div className="relative cursor-pointer">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-xl text-gray-600 hover:text-primary transition-colors duration-200"
              />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </div>
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={handleLoginModalToggle}
            >
              <p className="text-gray-600 group-hover:text-primary text-lg font-medium transition-colors duration-200">
                Login
              </p>
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary transition-colors duration-200">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-lg text-gray-600 group-hover:text-white transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer group hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-105 px-4 border-e-4">
            <FontAwesomeIcon
              icon={faTags}
              className="text-2xl text-gray-600 group-hover:text-primary transition-colors duration-300 ease-in-out"
            />
            <p className="text-gray-600 text-lg font-semibold group-hover:text-primary transition-colors duration-300 ease-in-out">
              Categories
            </p>
          </div>

          <div className="flex gap-6">
            <Link
              to="/"
              className={`text-gray-600 hover:text-primary text-lg font-medium ${
                location.pathname === "/"
                  ? "text-primary border-b-2 border-primary"
                  : ""
              }`}
            >
              Home
            </Link>
            {/* Add other links here */}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white w-[75%] max-w-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="flex justify-between items-center pb-6">
              <p className="font-bold text-xl">Login</p>
              <div
                className="flex justify-center items-center cursor-pointer bg-gray-200 p-2 rounded-full"
                onClick={handleLoginModalToggle}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-xl cursor-pointer"
                />
              </div>
            </div>
            <LoginModal triggerNotification={triggerNotification} />
            {notification.show && (
              <Notification
                message={notification.message}
                type={notification.type}
              />
            )}
            <p className="text-lg mt-4 text-center">
              Don't have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={handleSignupModalToggle}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white w-[85%] max-w-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="flex justify-between items-center pb-6">
              <p className="font-bold text-xl">Create Your Account !</p>
              <div
                className="flex justify-center items-center cursor-pointer bg-gray-200 p-2 rounded-full"
                onClick={handleSignupModalToggle}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-xl cursor-pointer"
                />
              </div>
            </div>
            <RegisterModal />
            <p className="text-lg mt-4 text-center">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer ps-1"
                onClick={() => {
                  setShowSignupModal(false); // Close signup modal
                  setShowLoginModal(true); // Open login modal
                }}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:hidden"
          onClick={handleMenuToggle}
        >
          <div
            className={`bg-white w-[85%] h-full p-6 absolute right-0 transform transition-all duration-500 ease-in-out ${
              menuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <p className="font-bold text-lg">Menu</p>
              <div className="bg-gray-200 p-2 rounded-full">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-xl cursor-pointer"
                  onClick={handleMenuToggle}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-lg text-gray-700 hover:text-primary"
                onClick={handleMenuToggle}
              >
                Home
              </Link>
              {/* Add other mobile menu links here */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
