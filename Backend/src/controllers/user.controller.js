import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new apiError(404, "User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new apiError(
      500,
      "An error occurred while generating the access and refresh tokens."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    address,
    phoneNumber,
    password,
    role = "customer",
  } = req.body;

  if (
    [fullName, email, address, password, phoneNumber].some(
      (field) => !field?.trim()
    )
  ) {
    throw new apiError(400, "All fields are required.");
  }

  const userExistingStatus = await User.findOne({
    $or: [{ phoneNumber }, { email }],
  });
  if (userExistingStatus) {
    throw new apiError(
      409,
      "A user with this email or phone number already exists."
    );
  }

  let profileImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.profileImage) &&
    req.files.profileImage.length > 0
  ) {
    profileImageLocalPath = req.files.profileImage[0].path;
  }
  const profileImage = await uploadOnCloudinary(profileImageLocalPath);

  const allowedRoles = ["customer", "vendor"];
  if (!allowedRoles.includes(role)) {
    throw new apiError(400, "Invalid role specified.");
  }

  const user = await User.create({
    fullName,
    profileImage: profileImage?.url || "",
    email,
    phoneNumber,
    password,
    address,
    role,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new apiError(500, "An error occurred while registering the user.");
  }

  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { phoneNumber, email, password } = req.body;
  if (!(email || phoneNumber)) {
    throw new apiError(400, "Email is required.");
  }

  const user = await User.findOne({
    $or: [{ phoneNumber }, { email }],
  });
  if (!user) {
    throw new apiError(400, "User not found.");
  }

  const isPassValid = await user.isPasswordCorrect(password);
  if (!isPassValid) {
    throw new apiError(401, "Incorrect password.");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week expiry
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/", // Make the cookie available to all routes
      domain: "localhost", // Set correct domain
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/", // Make the cookie available to all routes
      domain: "localhost", // Set correct domain
    })
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully."
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully."));
});

const refreshAccessTokenUser = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new apiError(401, "Refresh token is required.");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new apiError(401, "User not found for this token.");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(401, "Invalid or expired refresh token.");
    }

    const { accessToken, newRefreshToken } = await generateTokens(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new apiResponse(
          200,
          { accessToken, newRefreshToken },
          "Access token refreshed successfully."
        )
      );
  } catch (error) {
    throw new apiError(401, "Invalid refresh token.");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    throw new apiError(
      400,
      "New password and confirmation password do not match."
    );
  }

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new apiError(400, "Incorrect current password.");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password updated successfully."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new apiError(404, "User not found.");
  }
  return res
    .status(200)
    .json(new apiResponse(200, req.user, "Current user fetched successfully."));
});

const updateAccountDetailsUser = asyncHandler(async (req, res) => {
  const { fullName, email, address, phoneNumber } = req.body;

  if (!fullName || !email || !address || !phoneNumber) {
    throw new apiError(400, "All fields are required.");
  }

  try {
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      throw new apiError(404, "User not found.");
    }

    if (email !== currentUser.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new apiError(400, "Email already exists in the database.");
      }
    }

    if (phoneNumber !== currentUser.phoneNumber) {
      const existingPhone = await User.findOne({ phoneNumber });
      if (existingPhone) {
        throw new apiError(400, "Phone number already exists in the database.");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          fullName,
          email,
          address,
          phoneNumber,
        },
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          updatedUser,
          "Account details updated successfully."
        )
      );
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message:
        error.message || "An error occurred while updating account details.",
    });
  }
});

const updateUserProfileImage = asyncHandler(async (req, res) => {
  const profileImageLocalPath = req.files?.path;
  if (!profileImageLocalPath) {
    throw new apiError(400, "Profile image is missing.");
  }

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  if (!profileImage) {
    throw new apiError(400, "Error uploading profile image.");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        profileImage: profileImage.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new apiResponse(200, user, "Profile image updated successfully."));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessTokenUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetailsUser,
  updateUserProfileImage,
};
