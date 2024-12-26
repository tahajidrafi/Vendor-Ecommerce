import express from "express";
import { adminRoute, verifyJWTAdmin } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/caregory.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router
  .route("/create-category")
  .post(verifyJWTAdmin, adminRoute, createCategory);

router
  .route("/delete-category/:id")
  .delete(verifyJWTAdmin, adminRoute, deleteCategory);

export default router;
