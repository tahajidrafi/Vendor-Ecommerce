import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

export const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { product, quantity } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new apiError(404, "User not found.");
  }
  const existingItem = user.cartItems.find(
    (item) => item.product.toString() === product
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cartItems.push({ product, quantity });
  }

  await user.save();
  res
    .status(200)
    .json(new apiResponse(200, user.cartItems, "Item added to cart"));
});

export const removeItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  user.cartItems = user.cartItems.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();
  res
    .status(200)
    .json(new apiResponse(200, user.cartItems, "Item removed from cart"));
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { quantity } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const cartItem = user.cartItems.find(
    (item) => item.product.toString() === productId
  );
  if (!cartItem) {
    res.status(404);
    throw new Error("Product not found in cart.");
  }

  cartItem.quantity = quantity;
  await user.save();

  res.status(200).json(new apiResponse(200, user.cartItems, "Cart updated"));
});

// Get the current user's cart
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate("cartItems.product");
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json(new apiResponse(200, user.cartItems, "Cart fetched"));
});
