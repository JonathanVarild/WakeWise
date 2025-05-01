// Setup express.js
const express = require("express");
const app = express();
const utilities = require("./utilities");

// Set up the uploads directory.
utilities.setupFileDirectory();

// Tell express to parse all JSON.
app.use(express.json());

// Require all routes.
const storageRoutes = require("./routes/storage");

// Set up the routes.
app.use("/objectstorage/storage", storageRoutes);

// // Error handling middleware.
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