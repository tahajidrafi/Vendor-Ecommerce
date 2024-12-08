import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faAngleDown,
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const nevigate = useNavigate();
  const [hideNav, setHideNav] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="border-b border-gray-300">
      {/* Mobile Menu */}
      <nav
        className={`fixed bg-black text-white z-50 h-full w-3/4 sm:w-2/5 top-0 transition-transform duration-300 ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative p-6">
          {/* Close Button */}
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute top-4 right-4 text-2xl cursor-pointer"
            onClick={() => setOpenMenu(false)}
          />
          {/* Menu Items */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <p onClick={() => setShowDropdown(!showDropdown)}>Shop</p>
              <FontAwesomeIcon
                icon={faAngleDown}
                className={`transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </div>
            {showDropdown && (
              <div className="pl-6 space-y-2">
                {["Casual", "Formal", "Party", "Wedding/Event"].map((item) => (
                  <p key={item} className="py-1 text-sm hover:text-gray-300">
                    {item}
                  </p>
                ))}
              </div>
            )}
            {["On sale", "New Arrival", "Brands"].map((item) => (
              <p key={item} className="py-2 border-t border-gray-700">
                {item}
              </p>
            ))}
          </div>
        </div>
      </nav>

      {/* Upper Banner */}
      {hideNav && (
        <div className="bg-black text-white text-sm py-2 flex justify-center relative">
          <div className="flex items-center gap-2">
            <span>Sign up & get 20% Off your first order.</span>
            <a href="#" className="font-bold underline">
              Sign Up Now
            </a>
          </div>
          <FontAwesomeIcon
            icon={faXmark}
            className="absolute right-4 top-2 cursor-pointer hidden sm:block"
            onClick={() => setHideNav(false)}
          />
        </div>
      )}

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* Mobile Menu Icon */}
        <FontAwesomeIcon
          icon={faBars}
          className="sm:hidden text-2xl cursor-pointer"
          onClick={() => setOpenMenu(true)}
        />

        {/* Logo */}
        <Link to="/" className="text-4xl font-bold">
          Shop.Co
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-8 items-center text-lg">
          <div className="relative group">
            <button className="flex items-center gap-2 cursor-pointer">
              Shop <FontAwesomeIcon icon={faAngleDown} />
            </button>
            <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md">
              <ul className="py-2">
                {["Casual", "Formal", "Party", "Wedding/Event"].map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {["On sale", "New Arrival", "Brands"].map((item) => (
            <p
              key={item}
              className="cursor-pointer hover:text-gray-500 transition-colors"
            >
              {item}
            </p>
          ))}
        </div>

        {/* Search and Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden sm:block relative">
            <input
              type="text"
              className="bg-gray-100 rounded-full h-10 pl-10 pr-4 w-80 placeholder-gray-500 text-sm focus:outline-none"
              placeholder="Search for products..."
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute top-2 left-3 text-gray-500"
            />
          </div>

          {/* Cart and Profile */}
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-2xl sm:hidden"
            />
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-2xl hover:text-gray-500"
              />
            </Link>
            <FontAwesomeIcon
              icon={faUser}
              className="text-2xl hover:text-gray-500 cursor-pointer"
              onClick={() => nevigate("/auth")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
