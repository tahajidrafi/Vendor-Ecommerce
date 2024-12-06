import express from "express";
const router = express.Router();
import {
  verifyJWTAdmin,
  verifyJWTUser,
  verifyJWTVendor,
} from "../middlewares/auth.middleware.js";
import {
  getAllOrdersAdmin,
  getCustomerOrders,
  getOrderDetailsCustomer,
  getOrderDetailsVendor,
  getVendorOrders,
  placeOrder,
  updateOrderStatusAdmin,
  updateOrderStatusVendor,
} from "../controllers/order.controller.js";

router.post("/", verifyJWTUser, placeOrder);

router.get("/customer", verifyJWTUser, getCustomerOrders);

router.get("/:orderId", verifyJWTUser, getOrderDetailsCustomer);

router.get("/vendors/:vendorId/orders", verifyJWTVendor, getVendorOrders);

router.get(
  "/vendors/:vendorId/orders/:orderId",
  verifyJWTVendor,
  getOrderDetailsVendor
);

router.patch(
  "/vendors/:vendorId/orders/:orderId/status",
  verifyJWTVendor,
  updateOrderStatusVendor
);

router.get("/admin/orders", verifyJWTAdmin, getAllOrdersAdmin);

router.patch(
  "/admin/orders/:orderId/status",
  verifyJWTAdmin,
  updateOrderStatusAdmin
);

export default router;
