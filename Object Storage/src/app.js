// Setup express.js
const express = require("express");
const app = express();

// Tell express to parse all JSON.
app.use(express.json());

// Require all routes.
const storageRoutes = require("./routes/storage")

// Set up the routes.
app.use("/objectstorage/uploads", storageRoutes);

// Export the app module.
module.exports = app;