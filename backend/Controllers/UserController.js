const CatchAsyncError = require("../Middleware/CatchAsyncError");
const User = require("../Models/UserModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const sendToken = require("../Utils/JwtToken");
const crypto = require("crypto");

//--Register a User

exports.registerUser = CatchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(typeof(name),typeof(email),typeof(password));
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
  console.log(email, password);
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
