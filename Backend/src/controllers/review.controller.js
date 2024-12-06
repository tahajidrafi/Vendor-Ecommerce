import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { Product } from "../models/product.model.js";
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});

  return res
    .status(200)
    .json(new apiResponse(200, reviews, "Reviews fetched successfully."));
});

const getReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    throw new apiError(404, "Review not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, review, "Review fetched successfully."));
});

const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;

  if (!productId || !rating || !comment) {
    throw new apiError(400, "All fields are required.");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new apiError(404, "Product not found");
  }

  const newReview = await Review.create({
    productId,
    userId: req.user._id,
    rating,
    comment,
  });

  return res
    .status(201)
    .json(new apiResponse(201, newReview, "Review created successfully."));
});

const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(id);

  if (!review) {
    throw new apiError(404, "Review not found");
  }

  if (review.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Access denied - Unauthorized request");
  }

  review.rating = rating;
  review.comment = comment;

  const updatedReview = await review.save();

  return res
    .status(200)
    .json(new apiResponse(200, updatedReview, "Review updated successfully."));
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    throw new apiError(404, "Review not found");
  }

  if (review.userId.toString() !== req.user._id.toString()) {
    throw new apiError(403, "Access denied - Unauthorized request");
  }

  return res
    .status(200)
    .json(new apiResponse(200, review, "Review deleted successfully."));
});

export { getAllReviews, getReview, createReview, updateReview, deleteReview };
