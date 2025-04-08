// Import required modules
const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// Route: POST /api/auth/login
// Description: Authenticates the user and returns JWT token.
// Request Body: { "isAdmin": boolean, "pin": int}
router.post("/login", async (req, res) => {
	// Catch any errors.
	try {
		// Get request input.
		const { isAdmin, pin } = req.body;

		// Validate input.
		const token = await authService.authenticate(isAdmin, pin);

		// Check if token is valid.
		if (!token) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Return token to client.
		res.status(200).json({ token });
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
});

// Export the router module.
module.exports = router;