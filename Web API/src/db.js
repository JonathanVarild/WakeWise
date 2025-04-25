const { Pool } = require("pg");

const pool = new Pool({
	user: "wakewise",
	host: "localhost",
	database: "wakewise",
	password: "no_password",
	port: 5432,
});

/**
 * Function to perform a database query.
 *
 * @param {string} query - The SQL query to send to the database.
 * @param {Array} params - The parameters to pass to the SQL query.
 * @returns {Promise<any>} - Returns a promise that resolves to the result of the query.
 */
async function query(query, params) {
	return (res = await pool.query(query, params));
}

// Export functions.
module.exports = {
	query,
};
