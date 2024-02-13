const CatchAsyncError = require("../Middleware/CatchAsyncError");
const User = require("../Models/UserModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const sendToken = require("../Utils/JwtToken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  validName,
  validateEmail,
  validatePassword,
} = require("../Utils/Regex");

//--Register a User

exports.registerUser = CatchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(typeof(name),typeof(email),typeof(password));

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (!validName(name)) {
    return next(
      new ErrorHandler("Invalid name, provide a correct name, regex", 400)
    );
  }

  if (!validateEmail(email)) {
    return next(
      new ErrorHandler("Invalid email, provide a correct email", 400)
    );
  }

  if (!validatePassword(password)) {
    return next(
      new ErrorHandler(
        "Password must be atleast 8 characters long, must contain 1 uppercase, 1 lowercase, 1 number and 1 special character",
        400
      )
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login User

exports.loginUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);

  if (!email || !password) {
    return next(new ErrorHandler(`Please enter email and password`, 400));
  }
  const user = await User.findOne({ email }).select("password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

// Get User Details

exports.getUserDetails = CatchAsyncError(async (req, res, next) => {
  // console.log(req);
  // console.log(req.user._id);
  const user = await User.findById(req.user._id);
  // console.log("sfdgfdgahbhjbjnvknkfv");
  // console.log(user);
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout User

exports.logout = CatchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

// Update Password

exports.updatePassword = CatchAsyncError(async (req, res, next) => {
  const { user } = req;
  const { oldPassword, password } = req.body;

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!oldPassword || !password) {
    return next(
      new ErrorHandler("Old password and new password are required", 400)
    );
  }

  const userWithPassword = await User.findById(user._id).select("+password");

  const isMatched = await userWithPassword.comparePassword(oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  userWithPassword.password = password;
  await userWithPassword.save();
  res.status(200).json({
    success: true,
    message: "Password Updated Successfully",
    user: {
      _id: userWithPassword._id,
      username: userWithPassword.username,
    },
  });
});

// Update User Profile

exports.updateProfile = CatchAsyncError(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  if (!name || !email) {
    return next(new ErrorHandler("Name and Email are required", 400));
  }

  if (!validName(name)) {
    return next(
      new ErrorHandler("Invalid name, provide a correct name, regex", 400)
    );
  }

  if (!validateEmail(email)) {
    return next(
      new ErrorHandler("Invalid email, provide a correct email", 400)
    );
  }

  const userWithSameEmail = await User.findOne({ email });
  if (userWithSameEmail && userWithSameEmail._id.toString() !== user._id) {
    return next(new ErrorHandler("User with this email already exists", 400));
  }

  user.name = name;
  user.email = email;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user: {
      _id: user._id,
      username: user.name,
      email: user.email,
    },
  });
});

// Delete User

exports.deleteAccount = CatchAsyncError(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ErrorHandler("Please Provide Valid Value for Id", 402);
    }

    const isUserExist = await User.findByIdAndDelete({ _id: id });

    if (isUserExist) {
      res.status(201).json({
        success: true,
        message: `User Deleted Successfully with Id ${id}`,
      });
    } else {
      res.status(501).json({
        success: false,
        message: `Failed to Delete User with Id ${id}`,
      });
    }
  } catch (error) {
    throw new ErrorHandler("Server Error At Delete User Route", 501);
  }
});

exports.checkRefreshToken = CatchAsyncError(async (req, res) => {
  try {
    const { refreshToken } = req.cookies || req.body;

    const { id } = jwt.verify(refreshToken, process.env.ENCRYPTION_REF);

    if (id) {
      const user = await User.findById(id).select("name email refreshToken");

      if (user.refreshToken === refreshToken) return sendToken(user, 201, res);

      res
        .status(402)
        .json({ success: false, message: "Invalid or Expired RefreshToken" });
    } else {
      res
        .status(402)
        .json({ success: false, message: "Invalid or Expired RefreshToken" });
    }
  } catch (error) {
    console.log(error);
    throw new ErrorHandler("Server Error At Check Refresh Token Route", 501);
  }
});
