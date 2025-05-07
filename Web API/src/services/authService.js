// Import the necessary modules.
const database = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const PRODUCTION = process.env.NODE_ENV !== "development";
const JWT_SECRET = process.env.JWT_SECRET;

const cookieSettings = { httpOnly: true, sameSite: "strict", maxAge: 30 * 24 * 60 * 60 * 1000 };

/**
 * Function that authenticates a user based on their pin and role.
 *
 * @param {string} username - Indicates if the user has administrative privileges.
 * @param {string} password - PIN code for the user.
 * @returns {String | boolean} - Returns a JWT token if successful, otherwise false.
 */
async function authenticate(username, password) {
	//Get the user from the database.
	const result = await database.query("SELECT username, password_hash FROM users WHERE username = $1", [username]);

	// Check if we got any user.
	if (result.rowCount === 0) {
		return false;
	}

	// Get the user data.
	const retrievedUsername = result.rows[0].username;
	const hashedPassword = result.rows[0].password_hash;

	// Check if the password is correct.
	const accessGranted = await bcrypt.compare(password, hashedPassword);

	// Check if access was granted and return JWT token if it was.
	if (accessGranted) {
		return jwt.sign({ username: retrievedUsername }, JWT_SECRET, {
			expiresIn: "30d",
		});
	} else {
		return false;
	}
}

/**
 * Function that generates a new JWT token for a user.
 *
 * @param {string} username - The username of the user to renew the token.
 * @returns {String} - Returns a new JWT token.
 */
async function renewJWTToken(username) {
	// Get the user from the database.
	const result = await database.query("SELECT username FROM users WHERE username = $1", [username]);

	// Check if we got any user.
	if (result.rowCount === 0) {
		return false;
	}

	// Get the username.
	const retrievedUsername = result.rows[0].username;

	// Create the JWT and return it.
	return jwt.sign({ username: retrievedUsername }, JWT_SECRET, {
		expiresIn: "30d",
	});
}

/**
 * Function that retrieves all users from the database.
 *
 * @returns {Array} - Returns an array of users.
 */
async function retrieveUsers() {
	const result = await database.query("SELECT username, is_admin FROM users");

	// Allocate all users into an array.
	const users = [];
	for (let i = 0; i < result.rowCount; i++) {
		users.push({
			username: result.rows[i].username,
			isAdmin: result.rows[i].is_admin,
		});
	}

	// Return the users.
	return users;
}

/**
 * Middleware function for verifying JWT tokens in requests.
 *
 * @param {*} req - The http request object.
 * @param {*} res - The http response object.
 * @param {*} next - Function to call the next middleware.
 */
function verifyJWT(req, res, next) {
	// Get the HTTP token.
	const token = req.cookies.token;

	// CHeck if we got a token.
	if (!token) {
		return res.status(401).json({ message: "Missing JWT token." });
	}

	// Catch any errors.
	try {
		req.JWTData = jwt.verify(token, JWT_SECRET);
		next();
	} catch (err) {
		return res.clearCookie("token").status(401).json({ message: "Invalid JWT token." });
	}
}

// Export functions.
module.exports = {
	authenticate,
	renewJWTToken,
	retrieveUsers,
	cookieSettings,
	verifyJWT,
};
