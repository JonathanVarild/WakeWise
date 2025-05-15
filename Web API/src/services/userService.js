const database = require("../db");


async function setUserSettings(username, hashedPassword, isAdmin) {
  try {
    const result = await database.query(
      `INSERT INTO users (username, password_hash, is_admin)
       VALUES ($1, $2, $3)
       ON CONFLICT (username) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           is_admin      = EXCLUDED.is_admin
       RETURNING *`,  
      [username, hashedPassword, isAdmin]
    );
    
    console.log(`User settings updated successfully:${username}`, {
      rowsAffected: result.rowCount,
      isAdminUpdated: result.rows[0]?.is_admin
    });
    
    return result.rows[0];
  } catch (error) {
    console.error("Failed to save user settings:", {
      username,
      error: error.message
    });
    throw new Error(`Save failed: ${error.message}`);  
  }
}

module.exports = { setUserSettings };