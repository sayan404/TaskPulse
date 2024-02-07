const ErrorHandler = require("../Utils/ErrorHandler");
const CatchAsyncError = require("../Middleware/CatchAsyncError");

const Notification = require("../Models/NotificationModel");

const getUserNotifications = CatchAsyncError(async (req, res) => {
  const userId = req.params.userId;
  const notifications = await Notification.find({ userId });

  if (!notifications || notifications.length === 0) {
    throw new ErrorHandler("No new notifications", 404);
  }

  // Delete the fetched notifications
  await Notification.deleteMany({ userId });

  res.status(200).json({
    success: true,
    message: "Notifications:",
    data: notifications,
  });
});

module.exports = { getUserNotifications };
