import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import Header from "../components/Header";
import Notification from "../utils/Notification";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profileImage: "",
    role: "",
    totalSpent: "",
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // State for notification

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/dashboard",
          { withCredentials: true }
        );
        const { data: userData } = response.data;

        setUserData({
          fullName: userData.fullName || "N/A",
          email: userData.email || "N/A",
          phoneNumber: userData.phoneNumber || "N/A",
          address: userData.address || "N/A",
          profileImage:
            userData.profileImage || "https://via.placeholder.com/150",
          role: userData.role || "customer",
          totalSpent: `$${userData.totalSpent || 0}`,
        });

        setRecentOrders(["hii"]); // Placeholder for recent orders
        setWishlist(["hii"]); // Placeholder for wishlist
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setNotification({ message: "You have logged out!", type: "success" });
      navigate("/auth");
    } catch (err) {
      console.error("Error logging out:", err);
      setNotification({
        message: "Failed to log out. Please try again.",
        type: "error",
      });
    }
  };

  const handleUpdate = () => {
    navigate("/update-account-details");
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-70"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <Header />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} // Clear notification
        />
      )}
      <div className="min-h-screen bg-white text-gray-800">
        <div className="max-w-screen-lg mx-auto my-6 bg-gray-100 shadow-md rounded-lg overflow-hidden flex flex-col h-full">
          <div className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <aside className="bg-gray-200 p-4 rounded-lg shadow-md">
              <div className="text-center mb-6 relative">
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-28 h-28 mx-auto rounded-full shadow-lg"
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                  {userData.fullName}
                </h2>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
              <ul className="space-y-4">
                <li className="text-gray-700 hover:text-black">
                  <i className="fas fa-box mr-2"></i>{" "}
                  <a href="#">Order History</a>
                </li>
                <li className="text-gray-700 hover:text-black">
                  <i className="fas fa-heart mr-2"></i> <a href="#">Wishlist</a>
                </li>
                <li className="text-gray-700 hover:text-black">
                  <i className="fas fa-key mr-2"></i>{" "}
                  <a href="#">Change Password</a>
                </li>
              </ul>
              <button
                onClick={handleLogout}
                className="mt-6 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Log Out
              </button>
            </aside>

            {/* Main Content */}
            <section className="col-span-2 bg-gray-200 p-4 rounded-lg shadow-md">
              {/* Rest of your main content */}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
