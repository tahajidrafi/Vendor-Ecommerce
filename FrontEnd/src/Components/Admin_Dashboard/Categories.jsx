import React, { useState } from "react";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faPen,
  faTrashAlt,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import axios for API calls

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [categoryParentId, setCategoryParentId] = useState("");
  const [error, setError] = useState(""); // To store error messages

  const toggleExpand = (id) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  const handleDeleteCategory = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
  };

  const handleDeleteSubCategory = (categoryId, subCategoryId) => {
    const updatedCategories = categories.map((category) =>
      category.id === categoryId
        ? {
            ...category,
            subCategories: category.subCategories.filter(
              (sub) => sub.id !== subCategoryId
            ),
          }
        : category
    );
    setCategories(updatedCategories);
  };

  const handleCategorySubmit = async () => {
    try {
      if (!categoryName || !categorySlug) {
        setError("All fields are required");
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/api/v1/categories/create-category",
        {
          name: categoryName,
          slug: categorySlug,
          parentId: categoryParentId,
        }
      );
      setCategories((prevCategories) => [
        ...prevCategories,
        response.data.data,
      ]);
      setShowModal(false); // Close modal after adding category
      setCategoryName(""); // Clear input fields
      setCategorySlug("");
      setCategoryParentId("");
      setError(""); // Clear any previous errors
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Header />
      <div className="p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center px-4 py-2 mb-6">
          <p className="text-2xl font-bold text-gray-700">Categories</p>
          <div
            className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setShowModal(true)} // Open the modal on button click
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            <p className="text-lg">Add Category</p>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="mb-4 border-b pb-4 last:border-none"
              >
                {/* Main Category */}
                <div className="flex justify-between items-center py-4 hover:bg-gray-50 transition-all duration-300">
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {category.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {category.productCount} products
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xl">
                    <FontAwesomeIcon
                      icon={
                        expandedCategory === category.id
                          ? faChevronUp
                          : faChevronDown
                      }
                      className="cursor-pointer text-gray-600 hover:text-gray-800"
                      onClick={() => toggleExpand(category.id)}
                    />
                    <FontAwesomeIcon
                      icon={faPen}
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                      title="Edit"
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="cursor-pointer text-red-600 hover:text-red-800"
                      title="Delete"
                      onClick={() => handleDeleteCategory(category.id)}
                    />
                  </div>
                </div>

                {/* Sub-Categories */}
                {expandedCategory === category.id && (
                  <div className="ml-6 mt-4">
                    {category.subCategories.length > 0 ? (
                      category.subCategories.map((subCategory) => (
                        <div
                          key={subCategory.id}
                          className="flex justify-between items-center py-2 border-b last:border-none hover:bg-gray-50 transition-all duration-300"
                        >
                          <p className="text-gray-600">{subCategory.name}</p>
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="cursor-pointer text-red-600 hover:text-red-800"
                            title="Delete Sub-Category"
                            onClick={() =>
                              handleDeleteSubCategory(
                                category.id,
                                subCategory.id
                              )
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        No sub-categories added.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No categories found.
            </p>
          )}
        </div>
      </div>

      {/* Modal for adding a category */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Category
            </h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md">
                <p>{error}</p>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700"
              >
                Category Slug
              </label>
              <input
                type="text"
                id="slug"
                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="parentId"
                className="block text-sm font-medium text-gray-700"
              >
                Parent Category (Optional)
              </label>
              <input
                type="text"
                id="parentId"
                className="mt-2 block w-full border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={categoryParentId}
                onChange={(e) => setCategoryParentId(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-all"
                onClick={handleCategorySubmit}
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

export default Categories;
