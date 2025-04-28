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

// Require all routes.
const authRoutes = require("./routes/auth");

// Set up the routes.
app.use("/api/auth", authRoutes);

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

	// Call the next middleware.
	next();
});

// Export the app module.
module.exports = app;
