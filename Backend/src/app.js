import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiError } from "./utils/apiError.js"; // Adjust the path if needed
import apiResponse from "./utils/apiResponse.js";

// Initialize the Express app
const app = express();

// Middleware setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure this is in your .env file
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import UserRouter from "./routes/user.routes.js";
import VendorRouter from "./routes/vendor.routes.js";
import ProductRouter from "./routes/product.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import OrderRouter from "./routes/order.routes.js";
import ReviewRouter from "./routes/review.routes.js";
import TransactionRouter from "./routes/transaction.routes.js";
import CartRouter from "./routes/cart.routes.js";

// Register routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/vendors", VendorRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/transactions", TransactionRouter);
app.use("/api/v1/cart", CartRouter);

// Global error handler (this should come after all routes)
const errorHandler = (err, req, res, next) => {
  if (err instanceof apiError) {
    return res
      .status(err.statusCode || 500)
      .json(new apiResponse(err.statusCode, null, err.message));
  }

  // For unhandled errors
  console.error(err); // Log the error details for debugging
  return res
    .status(500)
    .json(new apiResponse(500, null, "Internal Server Error"));
};

app.use(errorHandler);

export { app };
