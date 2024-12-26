import React, { useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPen,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const Ads = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Ad Campaign 1",
      image: "https://via.placeholder.com/150x80",
      status: true,
    },
    {
      id: 2,
      title: "Ad Campaign 2",
      image: "https://via.placeholder.com/150x80",
      status: false,
    },
    {
      id: 3,
      title: "Ad Campaign 3",
      image: "https://via.placeholder.com/150x80",
      status: true,
    },
  ]);

  const handleStatusChange = (id) => {
    const updatedAds = ads.map((ad) =>
      ad.id === id ? { ...ad, status: !ad.status } : ad
    );
    setAds(updatedAds);
  };

  const handleDelete = (id) => {
    const filteredAds = ads.filter((ad) => ad.id !== id);
    setAds(filteredAds);
  };

  return (
    <div>
      <Header />
      <div className="p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center px-4 py-2 mb-6">
          <p className="text-2xl font-bold text-gray-700">Ads Campaigns</p>
          <div className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300">
            <FontAwesomeIcon icon={faCirclePlus} />
            <p className="text-lg">Add Ad Campaign</p>
          </div>
        </div>

        {/* Ads List */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="flex justify-between items-center py-4 border-b last:border-none hover:bg-gray-50 transition-all duration-300"
            >
              {/* Ad Details */}
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={ad.status}
                  className="w-5 h-5 accent-primary"
                  onChange={() => handleStatusChange(ad.id)}
                />
                <img
                  src={ad.image}
                  alt="Ad Thumbnail"
                  className="w-20 h-12 object-cover rounded-lg shadow-sm"
                />
                <p className="text-lg font-medium text-gray-700">{ad.title}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 text-xl">
                <FontAwesomeIcon
                  icon={faPen}
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                  title="Edit"
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="cursor-pointer text-red-600 hover:text-red-800"
                  title="Delete"
                  onClick={() => handleDelete(ad.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;
