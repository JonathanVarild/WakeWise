const path = require("path");
const fs = require("fs/promises");

const uploadsPath = path.join(__dirname, "../client-uploads");

async function setupFileDirectory() {
	await fs.mkdir(uploadsPath, { recursive: true });
}

module.exports = {
	setupFileDirectory,
	uploadsPath,
};
