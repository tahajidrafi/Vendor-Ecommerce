import { Vendor } from "../models/vendor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

const generateTokens = async (vendorId) => {
  try {
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      throw new apiError(404, "Vendor not found");
    }

    const accessToken = await vendor.generateAccessToken();
    const refreshToken = await vendor.generateRefreshToken();
    vendor.refreshToken = refreshToken;
    await vendor.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new apiError(
      500,
      "An error occurred while generating the access and refresh tokens."
    );
  }
};
const registerVendor = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    storeAddress,
    phoneNumber,
    password,
    role = "vendor",
    storeName,
    storeDescription,
  } = req.body;

  // Validate required fields except logo
  if (
    [
      fullName,
      email,
      storeAddress,
      password,
      phoneNumber,
      storeName,
      storeDescription,
    ].some((field) => !field?.trim())
  ) {
    throw new apiError(400, "All fields are required.");
  }

  // Check for existing vendor
  const vendorExistingStatus = await Vendor.findOne({
    $or: [{ phoneNumber }, { email }],
  });
  if (vendorExistingStatus) {
    throw new apiError(
      409,
      "A vendor with this email or phone already exists."
    );
  }

  // Validate logo and upload
  let logoLocalPath;
  if (req.files && req.files.logo && req.files.logo.length > 0) {
    logoLocalPath = req.files.logo[0].path;
  } else {
    throw new apiError(400, "Logo is required.");
  }

  const logo = await uploadOnCloudinary(logoLocalPath);
  console.log(logo);

  // Create vendor
  const vendor = await Vendor.create({
    fullName,
    email,
    storeAddress,
    phoneNumber,
    password,
    role,
    storeName,
    storeDescription,
    logo: logo?.url || "",
  });

  const createdVendor = await Vendor.findById(vendor._id).select(
    "-password -refreshToken"
  );
  if (!createdVendor) {
    throw new apiError(500, "Vendor not created.");
  }

  return res
    .status(201)
    .json(
      new apiResponse(201, createdVendor, "Vendor registered successfully.")
    );
});

const loginVendor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new apiError(400, "Email is required.");
  }

  const vendor = await Vendor.findOne({ email });
  if (!vendor) {
    throw new apiError(404, "Vendor not found.");
  }
  const isPassValid = await vendor.isPasswordCorrect(password);
  if (!isPassValid) {
    throw new apiError(401, "Incorrect password.");
  }

  const { accessToken, refreshToken } = await generateTokens(vendor._id);
  const loggedInVendor = await Vendor.findById(vendor._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(200, loggedInVendor, "Vendor logged in successfully.")
    );
});
const logoutVendor = asyncHandler(async (req, res) => {
  Vendor.findByIdAndUpdate(
    req.vendor._id,
    {
      $set: {
        refreshToken: null,
      },
    },
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
    .json(new apiResponse(200, {}, "Vendor logged out successfully."));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    throw new apiError(
      400,
      "New password and confirmation password do not match."
    );
  }

  const vendor = await User.findById(req.vendor?._id);
  const isPasswordCorrect = await vendor.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new apiError(400, "Incorrect current password.");
  }

  vendor.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password updated successfully."));
});
const refreshAccessTokenVendor = asyncHandler(async (req, res) => {
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

    const vendor = await Vendor.findById(decodedToken?._id);
    if (!vendor) {
      throw new apiError(401, "Vendor not found for this token.");
    }

    if (incomingRefreshToken !== vendor?.refreshToken) {
      throw new apiError(401, "Invalid or expired refresh token.");
    }

    const { accessToken, newRefreshToken } = await generateTokens(vendor._id);

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
const getCurrentVendor = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new apiResponse(200, req.vendor, "Current Vendor fetched successfully.")
    );
});
const updateAccountDetailsVendor = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    address,
    phoneNumber,
    storeAddress,
    storeName,
    storeDescription,
  } = req.body;
  if (
    !fullName ||
    !email ||
    !address ||
    !phoneNumber ||
    !storeAddress ||
    !storeName ||
    !storeDescription
  ) {
    throw new apiError(400, "All fields are required.");
  }

  const vendor = await Vendor.findByIdAndUpdate(
    req.vendor?._id,
    {
      $set: {
        fullName,
        email,
        address,
        phoneNumber,
        storeAddress,
        storeName,
        storeDescription,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new apiResponse(200, vendor, "Account details updated successfully.")
    );
});
const updateVendorLogo = asyncHandler(async (req, res) => {
  const logoLocalPath = req.files?.path;
  if (!logoLocalPath) {
    throw new apiError(400, "Logo is missing.");
  }

  const logo = await uploadOnCloudinary(logoLocalPath);
  if (!logo) {
    throw new apiError(400, "Error uploading The logo.");
  }

  const vendor = await Vendor.findByIdAndUpdate(
    req.vendor?._id,
    {
      $set: {
        logo: logo.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new apiResponse(200, vendor, "Logo updated successfully."));
});
export {
  registerVendor,
  loginVendor,
  logoutVendor,
  updatePassword,
  refreshAccessTokenVendor,
  getCurrentVendor,
  updateAccountDetailsVendor,
  updateVendorLogo,
};
