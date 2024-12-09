import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Vendor } from "../models/vendor.model.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { Review } from "../models/review.model.js";

export const verifyJWTVendor = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const vendor = await Vendor.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!vendor) {
      throw new apiError(401, "Invalid Access Token");
    }

    req.vendor = vendor;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});

export const verifyJWTUser = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new apiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});

export const verifyJWTAdmin = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const admin = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!admin || admin.role !== "admin") {
      throw new apiError(
        401,
        "Invalid Access Token or Insufficient Privileges"
      );
    }

    req.admin = admin;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});

export const vendorRoute = asyncHandler(async (req, res, next) => {
  if (req.vendor && req.vendor.role === "vendor") {
    next();
  } else {
    throw new apiError(403, "Access denied - Unauthorized request");
  }
});

export const adminRoute = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new apiError(403, "Access denied - Unauthorized request");
  }
});

export const verifyReviewOwner = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (review.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new apiError(403, "Access denied - Unauthorized request");
  }

  next();
});
