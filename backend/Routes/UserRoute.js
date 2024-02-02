const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {
  loginUser,
  logout,
  getUserDetails,
  registerUser,
} = require("../Controllers/UserController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticUser, getUserDetails);
router.route("/password/update").put(isAuthenticUser, updatePassword);

module.exports = router;
