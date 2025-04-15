// Import the necessary modules.
const database = require("../db");
const jwt = require("jsonwebtoken");

const PRODUCTION = process.env.NODE_ENV !== "development";
const JWT_SECRET = process.env.JWT_SECRET;

const cookieSettings = { httpOnly: true, secure: PRODUCTION, sameSite: "strict", maxAge: 30 * 24 * 60 * 60 * 1000 };

/**
 * Function that authenticates a user based on their pin and role.
 *
 * @param {string} username - Indicates if the user has administrative privileges.
 * @param {string} password - PIN code for the user.
 * @returns {String | boolean} - Returns a JWT token if successful, otherwise false.
 */
async function authenticate(username, password) {
	// TODO: fix later when database is set up.
	if (username === "Jonathan" && password === "1234") {
		return jwt.sign({ username }, JWT_SECRET, {
			expiresIn: "30d",
		});
	}

	return false;
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
	cookieSettings,
	verifyJWT,
};
