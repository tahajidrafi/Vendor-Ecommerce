import React from "react";

const DashedSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="border-4 border-dashed border-gray-600 dark:border-gray-200 rounded-full w-24 h-24 animate-spin border-t-transparent border-b-transparent"></div>
    </div>
  );
};

export default DashedSpinner;
