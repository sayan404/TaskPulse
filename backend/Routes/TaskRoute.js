const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {} = require("../Controllers/UserController");
const { createTask, deleteTask } = require("../Controllers/TaskController");
const router = express.Router();

router.post("/create", isAuthenticUser, createTask);
router.delete("/delete/:id", isAuthenticUser, deleteTask);

module.exports = router;
