import { Router } from "express";
import {
  adminRoute,
  vendorRoute,
  verifyJWTAdmin,
  verifyJWTVendor,
} from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFilteredProducts,
  getProductById,
  getVendorProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/all-products", verifyJWTAdmin, adminRoute, getAllProducts);
router.get("/my-products", verifyJWTVendor, vendorRoute, getVendorProducts);
router.route("/create").post(
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  verifyJWTVendor,
  vendorRoute,
  createProduct
);
router.get("/product/:id", getProductById);
router.put(
  "/update/:id",
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  verifyJWTVendor,
  vendorRoute,
  updateProduct
);
router.delete("/delete/:id", verifyJWTVendor, vendorRoute, deleteProduct);
router.get("/products", getFilteredProducts);

export default router;
