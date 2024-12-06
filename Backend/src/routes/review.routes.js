import express from "express";
const router = express.Router();
import {
  verifyJWTUser,
  verifyReviewOwner,
} from "../middlewares/auth.middleware.js";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from "../controllers/review.controller.js";

router.get("/", getAllReviews);

router.get("/:id", getReview);

router.post("/", verifyJWTUser, createReview);

router.put("/:id", verifyJWTUser, verifyReviewOwner, updateReview);

router.delete("/:id", verifyJWTUser, verifyReviewOwner, deleteReview);

export default router;
