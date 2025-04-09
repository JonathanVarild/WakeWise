// Setup express.js
const express = require("express");
const app = express();

// Tell express to parse all JSON.
app.use(express.json());

// Require all routes.
const uploadRoutes = require("./routes/uploads")

// Set up the routes.
app.use("/objectstorage/uploads", uploadRoutes);

// Export the app module.
module.exports = app;