// Import the necessary modules.
const database = require("../db");
const { uploadsPath } = require("../utilities");
const fs = require("fs/promises");

/**
 * Function used to save a file to the database.
 *
 * @param {*} data - The file data to be saved.
 * @param {string} fileName - The name of the file.
 * @returns int - Returns the ID of the file.
 */
async function saveFile(file) {
	try {
		if (!file) {
			return res.status(400).json({ error: "Missing file upload." });
		}

		await database.query("START TRANSACTION");
		const result = await database.query("INSERT INTO files_metadata (file_name, mime_type, size_bytes) VALUES ($1, $2, $3) RETURNING id", [
			file.originalname,
			file.mimetype,
			file.size,
		]);

		const fileId = result.rows[0].id;

		await fs.writeFile(`${uploadsPath}/${fileId}.data`, file.buffer);

		await database.query("COMMIT");
	} catch (error) {
		await database.query("ROLLBACK");
		throw error;
	}
}

/**
 * Function used to delete a file from the database.
 *
 * @param {int} id - The ID of the file to be deleted.
 * @returns boolean - True if the file was deleted, false otherwise.
 */
async function deleteFile(id) {
	try {
		await database.query("START TRANSACTION");
		const result = await database.query("DELETE FROM files_metadata WHERE id = $1 RETURNING id", [id]);

		if (result.rowCount === 0) {
			throw new Error("File not found");
		}

		const fileId = result.rows[0].id;

		await fs.unlink(`${uploadsPath}/${fileId}.data`);
		await database.query("COMMIT");
	} catch (error) {
		await database.query("ROLLBACK");
		throw error;
	}
}

/**
 * Function used to download a file from the database.
 *
 * @param {int} id - The ID of the file to be downloaded.
 * @returns object - The file data.
 */
async function getFile(id) {
	const result = await database.query("SELECT * FROM files_metadata WHERE id = $1", [id]);

	let file;
	let fileData;

	try {
		file = result.rows[0];
		fileData = await fs.readFile(`${uploadsPath}/${file.id}.data`);
	} catch (error) {
		return null;
	}

	return {
		id: file.id,
		file_name: file.file_name,
		mime_type: file.mime_type,
		size_bytes: file.size_bytes,
		data: fileData,
	};
}

// Export functions.
module.exports = {
	saveFile,
	deleteFile,
	getFile,
};
