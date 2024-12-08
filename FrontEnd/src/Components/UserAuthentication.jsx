import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const UserAuthenticationForm = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState(""); // State for error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setLoading(true);
    try {
      setError(""); // Reset error before making the request
      let response;
      if (activeTab === "register") {
        response = await axios.post(
          "http://localhost:8000/api/v1/users/register",
          formData
        );
      } else {
        response = await axios.post(
          "http://localhost:8000/api/v1/users/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        alert(response.data.message); // Show success message
      } else {
        setError(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 text-gray-800 relative">
      {/* Blur effect during loading */}
      {loading && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-10">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      )}

      <div
        className={`w-full max-w-md md:max-w-lg p-6 bg-white rounded-lg shadow-lg border border-gray-200 ${
          loading ? "filter blur-sm" : ""
        }`}
      >
        {/* Tabs for Login/Register */}
        <div className="flex justify-around mb-6">
          <button
            className={`w-1/2 text-center py-2 font-semibold ${
              activeTab === "register"
                ? "border-b-2 border-gray-800 text-gray-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("register")}
            disabled={loading}
          >
            Register
          </button>
          <button
            className={`w-1/2 text-center py-2 font-semibold ${
              activeTab === "login"
                ? "border-b-2 border-gray-800 text-gray-800"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
            disabled={loading}
          >
            Login
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white text-center py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {activeTab === "register" && (
            <>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
          <button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-700 transition py-2 rounded-md font-semibold"
            disabled={loading}
          >
            {activeTab === "register" ? "Register" : "Login"}
          </button>
          {activeTab === "register" && (
            <button
              type="button"
              className="w-full mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200 transition py-2 rounded-md font-semibold border border-gray-300"
              onClick={() => alert("Redirecting to Vendor Registration...")}
              disabled={loading}
            >
              Signup as a Vendor
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserAuthenticationForm;
