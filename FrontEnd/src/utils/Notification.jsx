import React, { useState, useEffect } from "react";

const Notification = ({ message, type = "info", onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    success: "bg-gray-800 text-white border-l-4 border-gray-500",
    error: "bg-gray-100 text-gray-800 border-l-4 border-gray-500",
    warning: "bg-gray-200 text-gray-800 border-l-4 border-gray-500",
    info: "bg-white text-gray-800 border-l-4 border-gray-500",
  };

  return (
    <div
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 max-w-lg w-full p-5 border ${
        typeStyles[type] || typeStyles.info
      } rounded-lg shadow-2xl transition-all opacity-100 sm:px-5 md:px-10`}
      style={{
        borderColor:
          type === "info" ? "#ccc" : type === "error" ? "#f44336" : "#4CAF50",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-lg font-serif">{message}</div>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="text-3xl text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
