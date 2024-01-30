const mongoose = require("mongoose");
const Task = require("../Models/TaskModel")(mongoose);
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");

const createTask = CatchAsyncError(async (req, res, next) => {
  const { title, dueDate, priority, description } = req.body;
  console.log("hit 1");
  if (!title || !dueDate || !priority || !description) {
    throw new ErrorHandler("Please Provide Values for All Fields", 401);
  }

  const addTask = await Task.create({
    taskName: title,
    dueDate,
    priority,
    description,
  });

  console.log(addTask);

  const isTaskCreated = await Task.findOne({ _id: addTask._id });

  if (isTaskCreated) {
    return res.status(200).json({
      success: true,
      message: "Task Created Successfully",
      data: isTaskCreated,
    });
  } else {
    return res
      .status(501)
      .json({ success: false, error: "Failed to Create Task" });
  }
});

module.exports = { createTask };
