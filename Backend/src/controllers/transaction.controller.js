import { Transaction } from "../models/transaction.model.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTransaction = asyncHandler(async (req, res) => {
  const { orderId, amount, vendorId, commission, status } = req.body;

  if (!orderId || !amount || !vendorId || !commission || !status) {
    res.status(400);
    throw new apiError(400, "All fields are required.");
  }

  const transaction = new Transaction({
    orderId,
    amount,
    vendorId,
    commission,
    status,
  });

  const savedTransaction = await transaction.save();

  res
    .status(201)
    .json(
      new apiResponse(
        201,
        savedTransaction,
        "Transaction created successfully."
      )
    );
});
const getTransactionById = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  const transaction = await Transaction.findById(transactionId).populate(
    "orderId vendorId"
  );
  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found.");
  }

  res
    .status(200)
    .json(
      new apiResponse(200, transaction, "Transaction fetched successfully.")
    );
});
const getVendorTransactions = asyncHandler(async (req, res) => {
  const { vendorId } = req.params;

  const transactions = await Transaction.find({ vendorId }).populate(
    "orderId vendorId"
  );

  if (!transactions || transactions.length === 0) {
    res.status(404);
    throw new Error("No transactions found for this vendor.");
  }

  // Send response
  res
    .status(200)
    .json(
      new apiResponse(200, transactions, "Transactions fetched successfully.")
    );
});
const updateTransactionStatus = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const { status } = req.body;

  const validStatuses = ["paid", "failed", "pending"];
  if (!status || !validStatuses.includes(status)) {
    res.status(400);
    throw new Error(
      "Invalid status. Valid statuses are: paid, failed, pending."
    );
  }

  const transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    { status },
    { new: true }
  );

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found.");
  }

  res
    .status(200)
    .json(new apiResponse(200, transaction, "Transaction updated"));
});

export {
  createTransaction,
  getTransactionById,
  getVendorTransactions,
  updateTransactionStatus,
};
