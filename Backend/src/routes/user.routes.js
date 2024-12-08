// user.routes.js
import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessTokenUser,
  registerUser,
  updateAccountDetailsUser,
  updateUserProfileImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWTUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWTUser, logoutUser);
router.route("/refresh-token").post(refreshAccessTokenUser);
router.route("/change-password").post(verifyJWTUser, changeCurrentPassword);
router.route("/dashboard").get(verifyJWTUser, getCurrentUser);
router.route("/update-account").post(verifyJWTUser, updateAccountDetailsUser);
router
  .route("/update-profile-image")
  .post(verifyJWTUser, upload.single("profileImage"), updateUserProfileImage);

export default router;
