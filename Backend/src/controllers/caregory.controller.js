import { Category } from "../models/category.model.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  return res
    .status(200)
    .json(new apiResponse(200, categories, "Categories fetched successfully."));
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, parentId } = req.body;
  if (!name || !slug) {
    throw new apiError(400, "All fields are required.");
  }

  const category = await Category.create({ name, slug, parentId });

  return res
    .status(201)
    .json(new apiResponse(201, category, "Category created successfully."));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      throw new apiError(404, "Category not found");
    }

    return res
      .status(200)
      .json(
        new apiResponse(200, deletedCategory, "Category deleted successfully.")
      );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

export { getAllCategories, createCategory, deleteCategory };
