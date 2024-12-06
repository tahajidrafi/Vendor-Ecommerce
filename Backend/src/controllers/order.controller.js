import { Order } from "../models/order.model.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const placeOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    res.status(400).json(new apiError(400, "No items in the order."));
  }

  if (!shippingAddress || !totalAmount) {
    res
      .status(400)
      .json(
        new apiError(400, "Shipping address and total amount are required.")
      );
  }

  const newOrder = await Order.create({
    userId: req.user._id,
    items,
    totalAmount,
    shippingAddress,
  });

  if (newOrder) {
    res
      .status(201)
      .json(new apiResponse(201, newOrder, "Order placed successfully."));
  } else {
    res.status(500).json(new apiError(500, "Failed to place the order."));
  }
});
const getCustomerOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  if (orders && orders.length > 0) {
    res.status(200).json(new apiResponse(200, orders, "Orders fetched"));
  } else {
    res.status(404).json(new apiError(404, "No orders found"));
  }
});
const getOrderDetailsCustomer = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId, userId });

  if (order) {
    res.status(200).json(new apiResponse(200, order, "Order details fetched"));
  } else {
    res.status(404).json(new apiError(404, "Order not found"));
  }
});
const getVendorOrders = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  const orders = await Order.find({
    "items.productId": { $exists: true },
  })
    .populate({
      path: "items.productId",
      match: { vendorId: vendorId },
      select: "name price vendorId",
    })
    .sort({ createdAt: -1 });

  const vendorOrders = orders.filter((order) =>
    order.items.some(
      (item) =>
        item.productId && item.productId.vendorId.toString() === vendorId
    )
  );

  if (vendorOrders && vendorOrders.length > 0) {
    res.status(200).json(new apiResponse(200, vendorOrders, "Orders fetched"));
  } else {
    res.status(404).json(new apiError(404, "No orders found"));
  }
});
const getOrderDetailsVendor = asyncHandler(async (req, res) => {
  const { vendorId, orderId } = req.params;

  const order = await Order.findById(orderId).populate({
    path: "items.productId",
    select: "name price vendorId",
  });

  if (!order) {
    res.status(404).json(new apiError(404, "Order not found"));
  }

  const vendorItems = order.items.filter(
    (item) => item.productId && item.productId.vendorId.toString() === vendorId
  );

  if (vendorItems.length > 0) {
    res.status(200).json({
      message: "Order details retrieved successfully.",
      order: {
        ...order.toObject(),
        items: vendorItems,
      },
    });
  } else {
    res.status(403);
    throw new Error("You are not authorized to view this order.");
  }
});
const updateOrderStatusVendor = asyncHandler(async (req, res) => {
  const { vendorId, orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["shipped", "completed", "canceled"];
  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid status provided.");
  }

  const order = await Order.findById(orderId).populate({
    path: "items.productId",
    select: "vendorId",
  });

  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  const vendorItems = order.items.filter(
    (item) => item.productId && item.productId.vendorId.toString() === vendorId
  );

  if (vendorItems.length === 0) {
    res.status(403);
    throw new Error(
      "You are not authorized to update the status of this order."
    );
  }

  const updatedOrder = {
    ...order.toObject(),
    items: order.items.map((item) =>
      item.productId && item.productId.vendorId.toString() === vendorId
        ? { ...item, status }
        : item
    ),
  };

  await Order.findByIdAndUpdate(orderId, updatedOrder, { new: true });

  res.status(200).json({
    message: "Order status updated successfully.",
    updatedOrder,
  });
});
const getAllOrdersAdmin = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const filter = status ? { status } : {};

  const skip = (page - 1) * limit;

  const orders = await Order.find(filter)
    .populate("userId", "name email")
    .populate({
      path: "items.productId",
      select: "name price vendorId",
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments(filter);

  res.status(200).json({
    message: "Orders retrieved successfully.",
    orders,
    pagination: {
      currentPage: Number(page),
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    },
  });
});
const updateOrderStatusAdmin = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "shipped", "completed", "canceled"];
  if (!validStatuses.includes(status)) {
    res.status(400).json(new apiError(400, "Invalid status provided."));
  }

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  order.status = status;

  const updatedOrder = await order.save();

  res.status(200).json({
    message: "Order status updated successfully.",
    updatedOrder,
  });
});

export {
  placeOrder,
  getCustomerOrders,
  getOrderDetailsCustomer,
  getVendorOrders,
  getOrderDetailsVendor,
  updateOrderStatusVendor,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
};
