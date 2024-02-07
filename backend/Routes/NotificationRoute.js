const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {
  getUserNotifications,
} = require("../Controllers/NotificationController");
const router = express.Router();

router.get("/:userId", isAuthenticUser, getUserNotifications);

module.exports = router;
