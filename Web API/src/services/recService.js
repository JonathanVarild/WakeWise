const database = require("../db");

async function getMetadata() {
    try {
        const result = await database.query(
            `SELECT *
             FROM files_metadata`
        );

        if (result.rows.length === 0) {
            throw new Error("No recordings found");
        }

        return result.rows; // Returnera alla rader som JSON
    } catch (error) {
        throw new Error("Failed to fetch metadata: " + error.message);
    }
}

module.exports = {
    getMetadata,
};