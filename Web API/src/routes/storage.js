// Import required modules
const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const storageService = require("../services/storageService");

// Route: POST /api/storage/download
// Description: Retrives a file from the file storage.
// Request Body: { "id": int }
router.get("/download", authService.verifyJWT, async (req, res, next) => {
	const id = req.query.id;

	if (!id) {
		return res.status(400).json({ message: "Missing file ID" });
	}

	const response = await storageService.getFile(id);

	if (!response) {
		return res.status(404).json({ message: "File not found" });
	}

	res.status(response.status);
	for (const [key, value] of Object.entries(response.headers)) {
		res.setHeader(key, value);
	}
	response.data.pipe(res);
});

module.exports = router;
