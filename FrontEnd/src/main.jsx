import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.jsx";
import RegistrationForm from "./pages/Auth.jsx";
import UpdateUserDetails from "./pages/UpdateUserDetails.jsx";
import Dashboard from "./pages/UserDashboard.jsx";
import Loading from "./utils/Loading.jsx";
import { AuthProvider, useAuthContext } from "./utils/AuthContext.jsx"; // Import AuthProvider and context
import AdminDashboard from "./pages/AdminDashboard.jsx";

// Guest route for unauthenticated users
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return <Loading />;

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// Protected route for authenticated users
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return <Loading />;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* Wrap the app in AuthProvider */}
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
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-account-details"
            element={
              <ProtectedRoute>
                <UpdateUserDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
