import React from "react";

const NotificationBar = ({ message, type = "info", onClose }) => {
  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-300";
      case "error":
        return "bg-red-100 text-red-800 border-red-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "info":
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg px-4 py-3 rounded-md shadow-md border ${getStyles()} z-50 flex items-center justify-between`}
    >
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          className="ml-4 text-sm text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default NotificationBar;
