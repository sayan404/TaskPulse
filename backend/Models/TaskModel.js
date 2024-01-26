"use strict";

module.exports = (mongoose) => {
  const taskSchema = new mongoose.Schema(
    {
      taskName: {
        type: String,
        required: [true, "Please Provide Task Title"],
      },
      dueDate: {
        type: String,
        required: [true, "Due Date is Required"],
      },
      description: {
        type: String,
        required: [true, "Please Provide Description"],
      },
      priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Low",
        required: true,
      },
      image: {
        type: String,
        default: "",
      },
      // Later on We'll Change Type of Comments to Ref of Users
      Comments: [
        {
          type: String,
          default: [],
        },
      ],
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  const Task = mongoose.model("Task", taskSchema);
  return Task;
};
