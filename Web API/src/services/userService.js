const database = require("../db");
const bcrypt = require("bcrypt");

async function getAllUsers() {
  const result = await database.query(
    "SELECT id, username, is_admin, created_at FROM users ORDER BY created_at DESC"
  );
  return result.rows.map(user => ({
    id: user.id,
    username: user.username,
    role: user.is_admin ? "admin" : "user",
    created_at: user.created_at
  }));
}

async function createUser(userData) {
  const client = await database.connect();
  try {
    await client.query('BEGIN');

    const existingUser = await client.query(
      "SELECT id FROM users WHERE username = $1 LIMIT 1",
      [userData.username]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("Username already exists");
    }

    if (!userData.password || userData.password.length < 1) {
      throw new Error("Password must be at least 1 characters");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const isAdmin = userData.role === "admin";

    const result = await client.query(
      `INSERT INTO users (username, password_hash, is_admin)
       VALUES ($1, $2, $3)
       RETURNING id, username, is_admin`,
      [userData.username, hashedPassword, isAdmin]
    );

    await client.query('COMMIT');
    return {
      id: result.rows[0].id,
      username: result.rows[0].username,
      role: result.rows[0].is_admin ? "admin" : "user"
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function updateUserRole(userId, newRole) {
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    const isAdmin = newRole === "admin";

    const result = await client.query(
      `UPDATE users 
       SET is_admin = $1 
       WHERE id = $2 
       RETURNING id, username, is_admin`,
      [isAdmin, userId]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    await client.query('COMMIT');
    return {
      id: result.rows[0].id,
      username: result.rows[0].username,
      role: result.rows[0].is_admin ? "admin" : "user"
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function updateUserPassword(userId, oldPassword, newPassword) {
  const client = await database.connect();
  try {
    await client.query('BEGIN');

    const user = await client.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userId]
    );

    if (user.rows.length === 0) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(oldPassword, user.rows[0].password_hash);
    if (!isValid) {
      throw new Error("Invalid current password");
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await client.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [newHash, userId]
    );

    await client.query('COMMIT');
    return { success: true };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function deleteUser(userId) {
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    
    const result = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [userId]
    );

    if (result.rowCount === 0) {
      throw new Error("User not found");
    }

    await client.query('COMMIT');
    return { success: true };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { 
  getAllUsers,
  createUser,
  updateUserRole,
  updateUserPassword,
  deleteUser
};