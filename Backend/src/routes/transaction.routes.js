import express from "express";
const router = express.Router();
import {
  verifyJWTAdmin,
  verifyJWTVendor,
} from "../middlewares/auth.middleware.js";
import {
  createTransaction,
  getTransactionById,
  getVendorTransactions,
  updateTransactionStatus,
} from "../controllers/transaction.controller.js";

// Create a new transaction
router.post("/", verifyJWTAdmin, createTransaction);

// Get a transaction by its ID
router.get("/:transactionId", verifyJWTAdmin, getTransactionById);

// Get all transactions for a specific vendor
router.get("/vendor/:vendorId", verifyJWTVendor, getVendorTransactions);

// Update the status of a transaction
router.patch("/:transactionId/status", verifyJWTAdmin, updateTransactionStatus);

export default router;
