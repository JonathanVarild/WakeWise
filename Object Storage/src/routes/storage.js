const express = require("express");
const router = express.Router();
const storageService = require("../services/storageService");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Route: POST /objectstorage/storage/upload
// Description: Uploads a file to the database.
// Request Body: { "file": file }
router.post("/upload", upload.single("file"), async (req, res, next) => {
	try {
		const file = req.file;
		const fileId = await storageService.saveFile(file);

		if (!fileId) {
			return res.status(400).json({ error: "Missing file upload." });
		}

		return res.status(200).json({ message: "File uploaded successfully.", fileId });
	} catch (error) {
		next(error);
	}
});

// Route: POST /objectstorage/storage/delete
// Description: Deletes a file from the database.
// Request Body: { "id": int }
router.post("/delete", async (req, res) => {
	const id = req.body.id;

	console.log("Received request to delete file", id);
	

	await storageService.deleteFile(id);

	return res.status(200).json({ message: "File deleted successfully." });
});

// Route: GET /objectstorage/storage/getfile
// Description: Retrieves a file from the database.
// Request Body: { "id": int }
router.get("/getfile", async (req, res) => {
	const id = req.query.id;
	const file = await storageService.getFile(id);

	if (!file) {
		return res.status(404).json({ message: "File not found." });
	}

	res.setHeader("Content-Type", file.mime_type);
	res.setHeader("Content-Disposition", `inline; filename="${file.file_name}"`);
	res.send(file.data);
});



module.exports = router;
