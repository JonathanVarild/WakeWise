// Import required modules
const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// Route: POST /api/auth/login
// Description: Authenticates the user and returns JWT token.
// Request Body: { "username": string, "password": string }
router.post("/login", async (req, res, next) => {
	try {
		// Get request input.
		const { username, password } = req.body;

		// Validate input.
		const token = await authService.authenticate(username, password);

		// Check if token is valid, and return a empty token if it isn't.
		if (!token) {
			return res.clearCookie("token").status(401).json({ message: "Invalid credentials" });
		}

		// Return token to client.
		res.cookie("token", token, authService.cookieSettings).status(200).json({ message: "Authenticated successfully", username: username });
	} catch (error) {
		// Pass the error to the error handling middleware.
		next(error);
	}
});

router.post("/reauth", authService.verifyJWT, async (req, res, next) => {
	try {
		// Renew the JWT token.
		const token = await authService.renewJWTToken(req.JWTData.username);

		// Check if token is valid, and return a empty token if it isn't.
		if (!token) {
			return res.clearCookie("token").status(401).json({ message: "Invalid credentials" });
		}

		// Return token to client.
		res.cookie("token", token, authService.cookieSettings).status(200).json({ message: "Re-authenticated successfully", username: req.JWTData.username });
	} catch (error) {
		// Pass the error to the error handling middleware.
		next(error);
	}
});

router.post("/getusers", async (req, res, next) => {
	try {
		// Get available users.
		const retrievedUsers = await authService.retrieveUsers();

		// Return token to client.
		res.status(200).json({ message: "Successfully retrieved users.", users: retrievedUsers, clockName: "Junior's Alarm Clock" });
	} catch (error) {
		// Pass the error to the error handling middleware.
		next(error);
	}
});

// Export the router module.
module.exports = router;
