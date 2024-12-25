import React from "react";
import Header from "./Header.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faChartPie,
  faChartSimple,
  faCheckCircle,
  faClock,
  faDollarSign,
  faShop,
  faShoppingCart,
  faSpinner,
  faTimesCircle,
  faTruck,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const MainDashboard = () => {
  return (
    <div>
      <Header />
      <div className="p-6">
        {/* Dashboard Heading */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">This is the admin dashboard</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-6">
          {/* Total Shops */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center relative overflow-hidden">
            <div className="flex flex-col">
              <p className="text-4xl font-extrabold">7</p>
              <p className="text-lg font-medium">Total Shops</p>
            </div>
            <FontAwesomeIcon
              icon={faShop}
              className="text-5xl absolute bottom-4 right-4 opacity-30"
            />
            <div className="absolute inset-0 bg-green-300 opacity-20 rounded-xl blur-xl"></div>
          </div>

          {/* Active Users */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center relative overflow-hidden">
            <div className="flex flex-col">
              <p className="text-4xl font-extrabold">15</p>
              <p className="text-lg font-medium">Active Users</p>
            </div>
            <FontAwesomeIcon
              icon={faUsers}
              className="text-5xl absolute bottom-4 right-4 opacity-30"
            />
            <div className="absolute inset-0 bg-blue-300 opacity-20 rounded-xl blur-xl"></div>
          </div>

          {/* Products Sold */}
          <div className="bg-gradient-to-r from-[#794C8A] to-[#772994] text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center relative overflow-hidden">
            <div className="flex flex-col">
              <p className="text-4xl font-extrabold">120</p>
              <p className="text-lg font-medium">Products Sold</p>
            </div>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-5xl absolute bottom-4 right-4 opacity-30"
            />
            <div className="absolute inset-0 bg-yellow-200 opacity-20 rounded-xl blur-xl"></div>
          </div>

          {/* Pending Orders */}
          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center relative overflow-hidden">
            <div className="flex flex-col">
              <p className="text-4xl font-extrabold">25</p>
              <p className="text-lg font-medium">Pending Orders</p>
            </div>
            <FontAwesomeIcon
              icon={faBox}
              className="text-5xl absolute bottom-4 right-4 opacity-30"
            />
            <div className="absolute inset-0 bg-red-300 opacity-20 rounded-xl blur-xl"></div>
          </div>
        </div>
        <div className="bg-white mt-5 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-4 border-b pb-4 mb-4">
            <FontAwesomeIcon icon={faChartSimple} className="text-2xl" />
            <p className="text-xl font-semibold text-gray-800">
              Order Analytics
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4 mt-4">
            {/* Pending */}
            <div className="bg-blue-50 border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between p-4 rounded-lg relative">
              <FontAwesomeIcon
                icon={faClock}
                className="text-blue-500 text-2xl"
              />
              <p className="text-blue-700 text-lg font-semibold">Pending</p>
              <p className="text-2xl font-bold text-blue-900">3</p>
              <div className="absolute inset-0 bg-blue-200 opacity-20 rounded-lg blur-xl"></div>
            </div>

            {/* Confirm */}
            <div className="bg-green-50 border border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between p-4 rounded-lg relative">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 text-2xl"
              />
              <p className="text-green-700 text-lg font-semibold">Confirm</p>
              <p className="text-2xl font-bold text-green-900">5</p>
              <div className="absolute inset-0 bg-green-200 opacity-20 rounded-lg blur-xl"></div>
            </div>

            {/* Processing */}
            <div className="bg-yellow-50 border border-yellow-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between p-4 rounded-lg relative">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-yellow-500 text-2xl"
              />
              <p className="text-yellow-700 text-lg font-semibold">
                Processing
              </p>
              <p className="text-2xl font-bold text-yellow-900">7</p>
              <div className="absolute inset-0 bg-yellow-200 opacity-20 rounded-lg blur-xl"></div>
            </div>

            {/* Delivered */}
            <div className="bg-purple-50 border border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between p-4 rounded-lg relative">
              <FontAwesomeIcon
                icon={faTruck}
                className="text-purple-500 text-2xl"
              />
              <p className="text-purple-700 text-lg font-semibold">Delivered</p>
              <p className="text-2xl font-bold text-purple-900">10</p>
              <div className="absolute inset-0 bg-purple-200 opacity-20 rounded-lg blur-xl"></div>
            </div>

            {/* Canceled */}
            <div className="bg-red-50 border border-red-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-between p-4 rounded-lg relative">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-red-500 text-2xl"
              />
              <p className="text-red-700 text-lg font-semibold">Canceled</p>
              <p className="text-2xl font-bold text-red-900">2</p>
              <div className="absolute inset-0 bg-red-200 opacity-20 rounded-lg blur-xl"></div>
            </div>
          </div>
        </div>
        <div className="bg-white mt-5 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* Wallet Header */}
          <div className="flex items-center gap-4 border-b pb-4 mb-4">
            <FontAwesomeIcon icon={faWallet} className="text-2xl" />
            <p className="text-xl font-semibold text-gray-800">Admin Wallet</p>
          </div>

          {/* Wallet Stats */}
          <div className="grid grid-cols-5 gap-4">
            {/* Total Earning */}
            <div className="bg-green-50 border border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 rounded-lg">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="text-green-500 text-2xl mb-2"
              />
              <p className="text-lg font-semibold text-green-700">
                Total Earning
              </p>
              <p className="text-2xl font-bold text-green-900">$12,500</p>
            </div>

            {/* Already Withdrawn */}
            <div className="bg-blue-50 border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 rounded-lg">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-blue-500 text-2xl mb-2"
              />
              <p className="text-lg font-semibold text-blue-700">
                Already Withdrawn
              </p>
              <p className="text-2xl font-bold text-blue-900">$9,000</p>
            </div>

            {/* Pending Withdrawal */}
            <div className="bg-yellow-50 border border-yellow-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 rounded-lg">
              <FontAwesomeIcon
                icon={faSpinner}
                className="text-yellow-500 text-2xl mb-2"
              />
              <p className="text-lg font-semibold text-yellow-700">
                Pending Withdraw
              </p>
              <p className="text-2xl font-bold text-yellow-900">$2,000</p>
            </div>

            {/* Total Commission */}
            <div className="bg-purple-50 border border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 rounded-lg">
              <FontAwesomeIcon
                icon={faChartPie}
                className="text-purple-500 text-2xl mb-2"
              />
              <p className="text-lg font-semibold text-purple-700">
                Total Commission
              </p>
              <p className="text-2xl font-bold text-purple-900">$1,000</p>
            </div>

            {/* Canceled Withdrawal */}
            <div className="bg-red-50 border border-red-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 rounded-lg">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-red-500 text-2xl mb-2"
              />
              <p className="text-lg font-semibold text-red-700">
                Canceled Withdraw
              </p>
              <p className="text-2xl font-bold text-red-900">$500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
