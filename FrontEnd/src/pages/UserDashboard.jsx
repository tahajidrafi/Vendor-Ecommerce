import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import Header from "../components/Header";

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/dashboard",
          {
            withCredentials: true, // Ensure cookies are sent
          }
        );

        console.log("Response Data:", response.data); // Log the full response to inspect

        const { data: userData } = response.data; // Get the user data from the response

        // Set user data in the state
        setUserData({
          fullName: userData.fullName || "N/A",
          email: userData.email || "N/A",
          phoneNumber: userData.phoneNumber || "N/A",
          address: userData.address || "N/A",
          profileImage:
            userData.profileImage || "https://via.placeholder.com/150",
          role: userData.role || "customer",
          totalSpent: `$${userData.totalSpent || 0}`, // You might need to update `totalSpent` if it's available elsewhere
        });

        // Since 'orders' and 'wishlist' are not part of the response, you can leave them empty for now or add other logic if needed
        setRecentOrders(["hii"]); // Set recent orders (empty for now)
        setWishlist(["hii"]); // Set wishlist (empty for now)
      } catch (err) {
        console.error(
          "Error fetching dashboard data:",
          err.response?.data || err.message
        );
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
      alert("You have logged out!");
      navigate("/auth");
    } catch (err) {
      console.error("Error logging out:", err);
      alert("Failed to log out. Please try again.");
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-semibold">Total Spent</h3>
                  <p className="text-lg font-bold">{userData.totalSpent}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-semibold">Orders Count</h3>
                  <p className="text-lg font-bold">{recentOrders.length}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-semibold">Reward Points</h3>
                  <p className="text-lg font-bold">0 pts</p>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold">Full Name</p>
                    <p className="text-lg">{userData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="text-lg">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <p className="text-lg">{userData.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Address</p>
                    <p className="text-lg">{userData.address}</p>
                  </div>
                </div>
                <button
                  onClick={handleUpdate}
                  className="mt-4 px-6 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800"
                >
                  Update
                </button>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                {recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-100 p-4 rounded-lg shadow-md mb-4"
                  >
                    <h3 className="text-sm font-bold">Order #{order._id}</h3>
                    <p className="text-sm">Date: {order.createdAt}</p>
                    <p className="text-sm">Total: {order.totalAmount}</p>
                    <p className="text-sm">Status: {order.status}</p>
                  </div>
                ))}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
                {wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex items-center"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-sm font-bold">{item.name}</h3>
                      <p className="text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
