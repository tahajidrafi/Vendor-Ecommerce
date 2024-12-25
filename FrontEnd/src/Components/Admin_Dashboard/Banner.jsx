import React, { useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPen,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const [isModified, setIsModified] = useState(false);
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Sample Banner 1",
      image: "https://via.placeholder.com/150x80",
      status: true,
    },
    {
      id: 2,
      title: "Sample Banner 2",
      image: "https://via.placeholder.com/150x80",
      status: false,
    },
    {
      id: 3,
      title: "Sample Banner 3",
      image: "https://via.placeholder.com/150x80",
      status: true,
    },
  ]);

  const handleStatusChange = (id) => {
    const updatedBanners = banners.map((banner) =>
      banner.id === id ? { ...banner, status: !banner.status } : banner
    );
    setBanners(updatedBanners);
    setIsModified(true);
  };

  const handleSave = () => {
    setIsModified(false);
    alert("Changes saved!");
  };

  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="flex justify-between items-center px-4 py-2 mb-6">
          <p className="text-2xl font-bold text-gray-700">Banner List</p>
          <div className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300">
            <FontAwesomeIcon icon={faCirclePlus} />
            <p className="text-lg">Add Banner</p>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-lg shadow-md p-4">
          <div className="space-y-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="flex justify-between items-center py-4 border-b hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={banner.status}
                      className="toggle toggle-primary w-10 h-6"
                      onChange={() => handleStatusChange(banner.id)}
                    />
                  </label>

                  <div className="flex items-center gap-6">
                    <img
                      src={banner.image}
                      alt="Thumbnail"
                      className="w-20 h-12 object-cover rounded-lg shadow-sm"
                    />
                    <p className="text-lg font-medium text-gray-700">
                      {banner.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xl">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg text-white ${
              isModified ? "bg-green-500" : "bg-gray-300 cursor-not-allowed"
            } transition-all duration-300`}
            disabled={!isModified}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
