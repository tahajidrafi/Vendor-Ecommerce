import React, { useEffect, useState } from "react";

const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div
      className={`fixed top-5 right-5 z-100 text-white px-4 py-2 rounded-md shadow-md ${getBackgroundColor()} transition-transform transform scale-100`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
