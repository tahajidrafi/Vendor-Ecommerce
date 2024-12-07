import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "20kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import UserRouter from "./routes/user.routes.js";
import VendorRouter from "./routes/vendor.routes.js";
import ProductRouter from "./routes/product.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import OrderRouter from "./routes/order.routes.js";
import ReviewRouter from "./routes/review.routes.js";
import TransactionRouter from "./routes/transaction.routes.js";
import CartRouter from "./routes/cart.routes.js";

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/vendors", VendorRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/orders", OrderRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/transactions", TransactionRouter);
app.use("/api/v1/cart", CartRouter);
export { app };
