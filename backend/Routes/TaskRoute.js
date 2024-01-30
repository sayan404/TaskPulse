const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {} = require("../Controllers/UserController");
const { createTask,getAllTasks } = require("../Controllers/TaskController");
const router = express.Router();

router.post("/create", isAuthenticUser, createTask);
router.get("/all", isAuthenticUser, getAllTasks);

module.exports = router;
