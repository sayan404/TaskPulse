const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {} = require("../Controllers/UserController");
const { createTask } = require("../Controllers/TaskController");
const router = express.Router();

router.post("/create", isAuthenticUser, createTask);

module.exports = router;
