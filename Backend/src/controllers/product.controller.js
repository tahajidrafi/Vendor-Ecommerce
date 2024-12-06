import { Product } from "../models/product.model.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});

    return res
      .status(200)
      .json(new apiResponse(200, products, "Products fetched successfully."));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new apiError(500, error.message));
  }
});

const getVendorProducts = asyncHandler(async (req, res) => {
  const vendorId = req.vendor._id;

  const products = await Product.find({ vendor: vendorId });

  res
    .status(200)
    .json(apiResponse(200, products, "Products fetched successfully."));
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, quantity, categoryId } = req.body;
    const vendorId = req.vendor._id;

    if (!name || !description || !price || !quantity || !categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const imageFiles = req.files?.images || [];
    const uploadedImages = await Promise.all(
      imageFiles.map((file) => uploadOnCloudinary(file.path))
    );

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      images: uploadedImages,
      categoryId,
      vendorId,
    });

    res
      .status(201)
      .json(new apiResponse(201, product, "Product created successfully."));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate("vendorId", "name email")
      .populate("categoryId", "name");

    if (!product) {
      throw new apiError(404, "Product not found");
    }

    res
      .status(200)
      .json(new apiResponse(200, product, "Product fetched successfully."));
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message:
        error.message || "Something went wrong while fetching the product.",
    });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, categoryId } = req.body;
  if (!name || !description || !price || !quantity || !categoryId) {
    throw new apiError(400, "All fields are required.");
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new apiError(404, "Product not found");
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.categoryId = categoryId;

    if (
      req.files &&
      Array.isArray(req.files.images) &&
      req.files.images.length > 0
    ) {
      const imageUrls = [];
      for (let i = 0; i < req.files.images.length; i++) {
        const imageLocalPath = req.files.images[i].path;
        const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        imageUrls.push(uploadedImage.url);
      }
      product.images = imageUrls;
    }

    const updatedProduct = await product.save();
    return res
      .status(200)
      .json(
        new apiResponse(200, updateProduct, "Product updated successfully.")
      );
  } catch (error) {
    throw new apiError(
      500,
      error.message || "Something went wrong during updating the product."
    );
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new apiError(404, "Product not found");
    }

    return res
      .status(200)
      .json(new apiResponse(200, product, "Product deleted successfully."));
  } catch (error) {
    throw new apiError(
      500,
      error.message || "Something went wrong during deleting the product."
    );
  }
});
const getFilteredProducts = asyncHandler(async (req, res) => {
  const { priceMin, priceMax, categoryId, vendorId, isFeatured } = req.query;

  const filter = {};

  if (priceMin || priceMax) {
    filter.price = {};
    if (priceMin) filter.price.$gte = priceMin;
    if (priceMax) filter.price.$lte = priceMax;
  }

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  if (vendorId) {
    filter.vendorId = vendorId;
  }

  if (isFeatured) {
    filter.isFeatured = isFeatured === "true";
  }

  try {
    const filterdproducts = await Product.find(filter);

    if (filterdproducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found with the specified filters.",
      });
    }

    res
      .status(200)
      .json(
        new apiResponse(
          200,
          filterdproducts,
          "Filtered products retrieved successfully."
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message:
        error.message ||
        "Something went wrong while retrieving the filtered products.",
    });
  }
});

export {
  getAllProducts,
  getVendorProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
};
