// Setup express.js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Read env variables from .env file.
dotenv.config({ path: ".env.production" });

// Tell express what to use.
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", true);

// Require all routes.
const authRoutes = require("./routes/auth");
const micRoutes = require("./routes/mic");
const displayRoutes = require("./routes/display");
const storageRoutes = require("./routes/storage");
const alarmRoutes = require("./routes/alarm");
const recRoutes = require("./routes/rec");
const settingsRoutes = require("./routes/settings");
const lightRoutes = require("./routes/lights");
const systemRoutes = require("./routes/systemSettings");
const statsRoutes = require("./routes/stats");
const clockRoutes = require("./routes/clock");
const userRoutes    = require("./routes/user"); 

// Set up the routes.
app.use("/api/auth", authRoutes);
app.use("/api", micRoutes);
app.use("/api", displayRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/alarm", alarmRoutes);
app.use("/api/rec", recRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/lights", lightRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/clock", clockRoutes);
app.use("/api/user",   userRoutes);  

// Error handling middleware.
app.use((err, _, res, next) => {
  // Print the error to the console.
  console.error(err.stack);

  // Check if we are running in production or development mode.
  // If we are in development mode, print the error message.
  // If we are in production mode, print a generic error message.§
  if (process.env.NODE_ENV !== "production") {
    res.status(500).json({ message: "SERVER ERROR: " + err.message });
  } else {
    res.status(500).json({ message: "An internal server error occured." });
  }
});

// Export the app module.
module.exports = app;
