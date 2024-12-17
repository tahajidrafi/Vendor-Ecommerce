import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Notification from "../utils/Notification.jsx";

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
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
        "http://localhost:8000/api/v1/users/login",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        setNotification({
          message: "Login successful!",
          type: "success",
        });
        setTimeout(() => (window.location.href = "/dashboard"), 1000);
      } else {
        setNotification({
          message: "Invalid credentials.",
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
            aria-label={showPassword ? "Hide password" : "Show password"}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
