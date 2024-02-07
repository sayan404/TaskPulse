const express = require("express");
const cors = require("cors"); // Import the 'cors' package
const ErrorHandler = require("./Utils/ErrorHandler");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Route imports
const user = require("./Routes/UserRoute");
const task = require("./Routes/TaskRoute");
const notification = require("./Routes/NotificationRoute");

// api route imports
app.use("/api/v1/users", user);
app.use("/api/v1/tasks", task);
app.use("/api/v1/notification", notification);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// Error Handling of all wrong routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Cannot find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
