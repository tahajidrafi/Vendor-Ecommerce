import axios from "axios";

// Ensure credentials (cookies) are sent with requests
axios.defaults.withCredentials = true;

// Function to check if the user is authenticated
export const checkAuth = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/users/dashboard"
    );
    return response.data; // This will return the user data if authenticated
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false; // If authentication fails, return false
  }
};

export const isUserLoggedIn = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/users/dashboard"
    );
    return response.data ? true : false; // Return true if the user is authenticated, else false
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false; // Return false if authentication fails
  }
};
