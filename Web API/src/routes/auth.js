// Import required modules
const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// Route: POST /api/auth/login
// Description: Authenticates the user and returns JWT token.
// Request Body: { "username": string, "password": string }
router.post("/login", async (req, res) => {
	// Catch any errors.
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
		res.status(500).json({ message: error.message });
		throw error;
	}
});

router.post("/test", authService.verifyJWT, async (req, res) => {
	console.log("Received test");

	res.status(200).json({ message: "Hello " + req.JWTData.username });
});

// Export the router module.
module.exports = router;
