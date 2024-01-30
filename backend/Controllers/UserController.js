const CatchAsyncError = require("../Middleware/CatchAsyncError");
const User = require("../Models/UserModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const sendToken = require("../Utils/JwtToken");
const crypto = require("crypto");
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
    return res
      .status(400)
      .json({ status: "failed", message: "All fields are required" });
  }
  if (!validName(name)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid name, provide a correct name, regex",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid email, provide a correct email",
    });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      status: "failed",
      message:
        "Password must be atleast 8 characters long, must contain 1 uppercase, 1 lowercase, 1 number and 1 special character",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ status: "failed", message: "User already exists" });
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
  const user = await User.findOne({ email }).select("+password");
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
