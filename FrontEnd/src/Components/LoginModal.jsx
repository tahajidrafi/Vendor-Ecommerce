import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
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
        window.location.href = "/dashboard";
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
        <label htmlFor="password" className="block text-lg text-gray-600 mb-1">
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
      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-lg text-primary hover:text-primary-dark transition"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md text-lg font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          disabled={loading}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginModal;
