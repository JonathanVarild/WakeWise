const database = require("../db");

async function setClockSettings(username, hashedPassword) {
  await database.query(
    `INSERT INTO users (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO UPDATE
     SET password_hash = EXCLUDED.password_hash`,
    [username, hashedPassword]
  );
}

module.exports = {
  setClockSettings,
};
