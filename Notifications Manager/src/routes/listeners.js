// Import required modules
const express = require("express");
const router = express.Router();
const listenersService = require("../services/listenersService");

// Route: POST /notificationsmanager/listeners/register
// Description: Registers a new notifications listener.
router.post("/register", async (req, res) => {
	// TODO: Register a new listener through listenersService...
});

// Route: POST /notificationsmanager/listeners/delete
// Description: Unregisters a notifications listener.
router.post("/delete", async (req, res) => {
	// TODO: Delete the listener through listenersService...
});


// Export the router module.
module.exports = router;