// Setup express.js
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv")

// Read env variables from .env file.
dotenv.config({ path: ".env.production" });

// Tell express what to use.
app.use(express.json());
app.use(cookieParser());

// Require all routes.
const authRoutes = require("./routes/auth");

// Set up the routes.
app.use("/api/auth", authRoutes);

// Export the app module.
module.exports = app;
