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

async function saveMetadata(id, file_name) {
    try {
        const save = await database.query(
            `UPDATE files_metadata 
             SET file_name = $1
             WHERE id = $2`,
            [file_name, id] // Skicka värdena som parametrar
        );

        console.log("Database update result:", save); // Logga resultatet


        if (save.rowCount === 0) {
            throw new Error("No recording found with the given ID");
        }

        return { message: "Recording name updated successfully" };
    } catch (error) {
        throw new Error("Failed to update metadata: " + error.message);
    }
}

module.exports = {
    getMetadata,
    saveMetadata
};