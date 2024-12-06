import { Router } from "express";
import {
  getCurrentVendor,
  loginVendor,
  logoutVendor,
  refreshAccessTokenVendor,
  registerVendor,
  updateAccountDetailsVendor,
  updatePassword,
  updateVendorLogo,
} from "../controllers/vendor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWTVendor } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "logo", maxCount: 1 }]), registerVendor);
router.route("/login").post(loginVendor);
router.route("/logout").post(verifyJWTVendor, logoutVendor);
router.route("/update-password").post(verifyJWTVendor, updatePassword);
router.route("/refresh-token").post(verifyJWTVendor, refreshAccessTokenVendor);
router.route("/dashboard").get(verifyJWTVendor, getCurrentVendor);
router
  .route("/update-account")
  .post(verifyJWTVendor, updateAccountDetailsVendor);
router
  .route("/update-logo")
  .post(verifyJWTVendor, upload.single("logo"), updateVendorLogo);
export default router;
