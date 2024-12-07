import express from "express";
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  getCart,
} from "../controllers/cart.controller.js";
import { verifyJWTUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWTUser, addItemToCart);

router.delete("/:productId", verifyJWTUser, removeItemFromCart);

router.patch("/:productId", verifyJWTUser, updateCartItemQuantity);

router.get("/", verifyJWTUser, getCart);

export default router;
