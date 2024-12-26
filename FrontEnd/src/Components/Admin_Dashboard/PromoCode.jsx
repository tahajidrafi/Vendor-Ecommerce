import React, { useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const PromoCode = () => {
  const [promoCodes, setPromoCodes] = useState([
    { id: 1, code: "DISCOUNT10", discount: "10%", expiry: "2024-12-31" },
    {
      id: 2,
      code: "FREESHIP",
      discount: "Free Shipping",
      expiry: "2025-01-15",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPromo, setNewPromo] = useState({
    code: "",
    discount: "",
    expiry: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromo({ ...newPromo, [name]: value });
  };

  const addPromoCode = () => {
    setPromoCodes([...promoCodes, { id: Date.now(), ...newPromo }]);
    setNewPromo({ code: "", discount: "", expiry: "" });
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="flex justify-between items-center px-4 py-2 mb-6">
          <p className="text-2xl font-bold text-gray-700">Promo Codes List</p>
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            <p className="text-lg">Add Promo Code</p>
          </div>
        </div>

        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Discount</th>
              <th className="px-4 py-2 text-left">Expiry</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promoCodes.map((promo) => (
              <tr key={promo.id} className="border-t">
                <td className="px-4 py-2">{promo.code}</td>
                <td className="px-4 py-2">{promo.discount}</td>
                <td className="px-4 py-2">{promo.expiry}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-blue-500 hover:underline mr-4">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button
                    onClick={() =>
                      setPromoCodes(
                        promoCodes.filter((item) => item.id !== promo.id)
                      )
                    }
                    className="text-red-500 hover:underline"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Promo Code</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Promo Code</label>
              <input
                type="text"
                name="code"
                value={newPromo.code}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter promo code"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Discount</label>
              <input
                type="text"
                name="discount"
                value={newPromo.discount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter discount"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiry"
                value={newPromo.expiry}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addPromoCode}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCode;
