const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {
  createTask,
  deleteTask,
  getAllTasks,
} = require("../Controllers/TaskController");
const router = express.Router();

router.post("/create", isAuthenticUser, createTask);
router.get("/all", isAuthenticUser, getAllTasks);
router.delete("/delete/:id", isAuthenticUser, deleteTask);

module.exports = router;
