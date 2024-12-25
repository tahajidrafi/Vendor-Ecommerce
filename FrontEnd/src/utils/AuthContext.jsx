import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "../utils/auth"; // Import your checkAuth utility

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider to manage global auth state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const authStatus = await checkAuth();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false); // Treat as not authenticated on error
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
