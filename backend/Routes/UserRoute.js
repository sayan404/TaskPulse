const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {
  loginUser,
  logout,
  getUserDetails,
  registerUser,
  deleteAccount,
} = require("../Controllers/UserController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticUser, getUserDetails);
router.route("/account/delete/:id").delete(isAuthenticUser, deleteAccount);

module.exports = router;
