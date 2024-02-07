const cron = require("node-cron");
const Notification = require("../Models/NotificationModel");
const Task = require("../Models/TaskModel");

// Schedule the task to create notifications for due tasks runs on intervals one minute.
const createNotificationsCronJob = async () => {
  cron.schedule("* * * * *", async () => {
    console.log("Task to create notifications for due tasks running...");
    const now = new Date();
    const rangeStart = new Date(now.getTime() - 15 * 1000);
    const rangeEnd = new Date(now.getTime() + 15 * 1000);

    console.log(now);

    // Find notifications within the 30-second range
    const tasks = await Task.find({
      dueDate: { $gte: rangeStart, $lte: rangeEnd },
    });

    // Create a notification for each task
    await Promise.all(
      tasks.map(async (task) => {
        const notification = new Notification({
          message: `Task "${task.description}" is due.`,
          userId: task.userId,
        });
        await notification.save();
        console.log(notification);
      })
    );
  });
};

module.exports = { createNotificationsCronJob };
