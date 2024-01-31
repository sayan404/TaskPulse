const mongoose = require("mongoose");
const Task = require("../Models/TaskModel")(mongoose);
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");

const createTask = CatchAsyncError(async (req, res, next) => {
  const { title, dueDate, priority, description } = req.body;

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

const getAllTasks = CatchAsyncError(async (req, res, next) => {
  const allTasks = await Task.find();

  if (allTasks.length > 0) {
    return res.status(200).json({
      success: true,
      message: "All Tasks Retrieved Successfully",
      data: allTasks,
    });
  } else {
    return res.status(404).json({
      success: false,
      error: "No tasks found",
    });
  }
});

const deleteTask = CatchAsyncError(async (req, res, next) => {
  // Extracting ID
  const { id } = req.params;

  // Checking For is ID Present
  if (!id) {
    throw new ErrorHandler("Please Provide Valid Id Value", 401);
  }

  // Checking for Existence of Task in DB
  const isTodoExist = await Task.findOne({ _id: id });

  if (isTodoExist) {
    const isDeleted = await Task.findOneAndDelete({ _id: id });

    // Sending Different Response on Base of Status of Deletion
    isDeleted &&
      res.status(200).json({
        success: true,
        message: `Task With Id:${id} Successfully Removed`,
      });

    !isDeleted &&
      res.status(502).json({
        success: false,
        message: `Failed to Remove Task With Id:${id}`,
      });
  } else {
    // If Task Not Exist With Provided ID
    return res.status(402).json({
      success: false,
      message: `No Todo Exist With Provided Id`,
    });
  }
});

module.exports = { createTask, deleteTask,getAllTasks };
