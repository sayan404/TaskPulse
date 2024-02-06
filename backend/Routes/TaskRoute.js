const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
} = require("../Controllers/TaskController");
const router = express.Router();

router.post("/create", isAuthenticUser, createTask);
router.get("/all", isAuthenticUser, getAllTasks);
router.delete("/delete/:id", isAuthenticUser, deleteTask);
router.put("/update/:id", isAuthenticUser, updateTask);
router.put('/tasks/:id/update-status', isAuthenticUser, updateTaskStatus);

module.exports = router;
