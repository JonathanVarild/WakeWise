// Import the necessary modules.
const database = require("../db");

/**
 * Function used to save a file to the database.
 * 
 * @param {*} data - The file data to be saved.
 * @param {string} fileName - The name of the file.
 * @returns int - Returns the ID of the file.
 */
async function saveFile(data, fileName) {
    // TODO.
    database.query("SAVE METADATA");
    return false;
}

/**
 * Function used to delete a file from the database.
 * 
 * @param {int} id - The ID of the file to be deleted.
 * @returns boolean - True if the file was deleted, false otherwise.
 */
async function deleteFile(id) {
    // TODO.
    database.query("delete METADATA");
    return false;
}

/**
 * Function used to rename a file in the database.
 * 
 * @param {int} id - The ID of the file to be renamed.
 * @param {string} newName - The new name of the file.
 * @returns 
 */
async function renameFile(id, newName) {
    // TODO.
    database.query("Update METADATA");
    return false;
}

// Export functions.
module.exports = {
    saveFile,
    deleteFile,
    renameFile
};