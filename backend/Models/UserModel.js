const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Name"],
    maxLength: [30, "Name Cannot Exceed 30 Charecter"],
    minLength: [4, "Name Should have more than 4 charecters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter a Valid Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email"],
    sparse: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "PLease Enter Your Password"],
    minLength: [8, "Password Should be Greater than 8 Charecters"],
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
