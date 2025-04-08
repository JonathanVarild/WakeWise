// Setup express.js
const express = require("express");
const app = express();

// Tell express to parse all JSON.
app.use(express.json());

// Require all routes.
const authRoutes = require("./routes/auth")

// Set up the routes.
app.use("/api/auth", authRoutes);

// Export the app module.
module.exports = app;