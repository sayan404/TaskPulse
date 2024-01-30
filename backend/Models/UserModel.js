const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    sparse: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your pasword"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, // This will hide password when we will be requied this data
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token Generation
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.ENCRYPTION_REF, {
    expiresIn: "86400 seconds",
  });
};
// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
