import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignupForm = () => {
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
  const [emailError, setEmailError] = useState(false); // Email error flag
  const [passwordError, setPasswordError] = useState(false); // Password error flag
  const [phoneError, setPhoneError] = useState(false); // Phone error flag

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset error flags when the user starts typing again
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "phoneNumber") setPhoneError(false);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError(true);
      isValid = false;
    }

    // Validate password
    if (formData.password.length < 8) {
      setPasswordError(true);
      isValid = false;
    }

    // Validate phone number (simple validation for digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      setPhoneError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      setError(""); // Reset error before making the request
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message);
        window.location.href = "/dashboard"; // Redirect to dashboard after successful signup
      } else {
        alert(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName" className="block text-sm text-gray-600 mb-1">
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
        <label htmlFor="address" className="block text-sm text-gray-600 mb-1">
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
          className="block text-sm text-gray-600 mb-1"
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
        {phoneError && (
          <p className="text-xs text-red-500">
            Phone number must be 10 digits.
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
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
        <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
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
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md text-sm font-semibold hover:bg-primary-dark"
          disabled={loading}
        >
          Register
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
};

export default SignupForm;
