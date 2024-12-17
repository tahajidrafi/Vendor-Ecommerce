import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Notification from "../utils/Notification.jsx";

const RegisterModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
    role: "customer",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "phoneNumber") setPhoneError(false);
  };

  const validateForm = () => {
    let isValid = true;

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError(true);
      setNotification({
        message: "Invalid email address.",
        type: "error",
      });
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 8) {
      setPasswordError(true);
      setNotification({
        message: "Password must be at least 8 characters.",
        type: "error",
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setNotification(null); // Clear previous notifications
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setNotification({
          message: response.data.message || "Registration successful!",
          type: "success",
        });
        setTimeout(() => (window.location.href = "/dashboard"), 1000);
      } else {
        setNotification({
          message: response.data.message || "An error occurred.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Unexpected error occurred.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-lg text-gray-600 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700"
            value={formData.fullName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-lg text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-lg text-gray-600 mb-1"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            className={`w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 ${
              phoneError ? "border-red-500" : ""
            }`}
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className={`w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 ${
              emailError ? "border-red-500" : ""
            }`}
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          {emailError && (
            <p className="text-xs text-red-500">
              Please enter a valid email address.
            </p>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-lg text-gray-600 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            className={`w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 ${
              passwordError ? "border-red-500" : ""
            }`}
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          {passwordError && (
            <p className="text-xs text-red-500">
              Password must be at least 8 characters long.
            </p>
          )}
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md text-lg font-semibold hover:bg-primary-dark"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterModal;
