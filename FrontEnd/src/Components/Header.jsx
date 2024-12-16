import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faBarsStaggered,
  faXmark,
  faTags,
  faEye,
  faEyeSlash, // Category icon
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // For routing
import logo from "../Images/logo.png";
import axios from "axios";
import SignupForm from "./SignupUser";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu visibility
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal
  const [showSignupModal, setShowSignupModal] = useState(false); // State for signup modal
  const location = useLocation(); // Get the current route for active link styling
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen); // Toggle mobile menu visibility
  };

  // Toggle the login modal
  const handleLoginModalToggle = () => {
    setShowLoginModal(!showLoginModal);
  };

  // Toggle the signup modal
  const handleSignupModalToggle = () => {
    setShowSignupModal(!showSignupModal);
    setShowLoginModal(false); // Close login modal if opening signup modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset error flags when the user starts typing
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError(""); // Reset error before making the request
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert(response.data.message);
        window.location.href = "/dashboard"; // Navigate to the dashboard
      } else {
        setError(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );

      if (error.response?.data?.message === "User not found") {
        setEmailError(true);
      } else if (error.response?.data?.message === "Incorrect password") {
        setPasswordError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <header>
      {/* Top Bar with seller registration link */}
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

      {/* Main Header */}
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

        {/* Desktop View Icons (Cart and Profile) */}
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
            {/* Open Login Modal on Click */}
            <p className="text-gray-600 group-hover:text-primary text-sm font-medium transition-colors duration-200 cursor-pointer">
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

        {/* Mobile View Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Search Icon */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-xl text-gray-600 hover:text-primary cursor-pointer"
          />
          {/* Hamburger Menu Icon */}
          <FontAwesomeIcon
            icon={faBarsStaggered}
            className="text-xl text-gray-600 hover:text-primary cursor-pointer"
            onClick={handleMenuToggle}
          />
        </div>
      </div>

      {/* Second Section (Categories, Cart, and Links) */}
      <div className="py-3 flex justify-between items-center px-4 md:px-8 bg-white shadow-md border-t border-gray-200">
        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Categories with icon */}
          <div className=" flex items-center gap-2 cursor-pointer group hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-105 px-4 border-e-4">
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
              {/* Open Login Modal on Click */}
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
          {/* Categories */}
          <div className="flex items-center gap-2 cursor-pointer group hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-105 px-4 border-e-4">
            <FontAwesomeIcon
              icon={faTags}
              className="text-2xl text-gray-600 group-hover:text-primary transition-colors duration-300 ease-in-out"
            />
            <p className="text-gray-600 text-lg font-semibold group-hover:text-primary transition-colors duration-300 ease-in-out">
              Categories
            </p>
          </div>

          {/* Desktop Menu Links */}
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
            {/* Other Links */}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white w-[85%] max-w-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 bg-gray-50 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2 bg-gray-50 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <span
                  className="absolute right-3 top-8 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </span>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-dark transition"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-md text-sm font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  disabled={loading}
                >
                  Login
                </button>
              </div>
            </form>
            {/* Signup Prompt */}
            <p className="text-sm mt-4 text-center">
              Don't have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={handleSignupModalToggle}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white w-[85%] max-w-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl">Sign Up</p>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-xl cursor-pointer"
                onClick={handleSignupModalToggle}
              />
            </div>
            {/* Signup Form */}
            <SignupForm />
            {/* Already have an account? Link to Login */}
            <p className="text-sm mt-4 text-center">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer"
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

      {/* Mobile Menu (Sliding from Right) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 md:hidden"
          onClick={handleMenuToggle} // Close the menu on outside click
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
              {/* Close Button */}
              <div className="bg-gray-200 p-2 rounded-full">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-xl cursor-pointer"
                  onClick={handleMenuToggle}
                />
              </div>
            </div>
            {/* Mobile Menu Links */}
            <div className="flex flex-col gap-4">
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
              {/* Other Links */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
