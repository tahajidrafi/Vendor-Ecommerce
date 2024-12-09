import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.jsx";
import RegistrationForm from "./pages/Auth.jsx";
import UserDashboard from "./pages/userDashboard.jsx";
import { checkAuth } from "./utils/auth.js";

// Custom hook for authentication check
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const authStatus = await checkAuth();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Error fetching auth status", error);
        setIsAuthenticated(false); // Handle error by treating as not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  return { isAuthenticated, loading };
};

// Guest route for unauthenticated users
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // You can replace this with a loader component

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// Protected route for authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            <GuestRoute>
              <RegistrationForm />
            </GuestRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
