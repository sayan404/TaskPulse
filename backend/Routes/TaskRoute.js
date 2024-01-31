const express = require("express");
const { isAuthenticUser } = require("../Middleware/Auth");
const {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} = require("../Controllers/TaskController");
const router = express.Router();

router.post("/create", isAuthenticUser, createTask);
router.get("/all", isAuthenticUser, getAllTasks);
router.delete("/delete/:id", isAuthenticUser, deleteTask);
router.put("/update/:id", isAuthenticUser, updateTask);

module.exports = router;
