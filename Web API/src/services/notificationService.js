const database = require("../db");

const SQL = {
  GET_LISTENER_ID: `SELECT id FROM notification_listeners WHERE user_id = $1`,
  GET_PREFERENCES: `SELECT * FROM notification_preferences WHERE listener_id = $1`,
  UPDATE_PREFERENCES: `
    UPDATE notification_preferences 
    SET not_in_bed = $1,
        time_to_sleep = $2,
        put_away_phone = $3,
        get_up = $4
    WHERE listener_id = $5
    RETURNING *`
};

const getPreferences = async (userId) => {
  try {
    const listener = await database.query(SQL.GET_LISTENER_ID, [userId]);
    if (!listener.rows[0]?.id) {
      throw new Error("Notification listener not found");
    }

    const preferences = await database.query(
      SQL.GET_PREFERENCES,
      [listener.rows[0].id]
    );

    return preferences.rows[0] || {};
  } catch (error) {
    console.error(`[Notification Service] Failed to retrieve preferences: ${error.message}`);
    throw new Error("Failed to retrieve notification preferences");
  }
};

const updatePreferences = async (userId, newPrefs) => {
  try {
    // 1. Retrieve listener ID
    const listener = await database.query(SQL.GET_LISTENER_ID, [userId]);
    if (!listener.rows[0]?.id) {
      throw new Error("Notification listener configuration does not exist");
    }

    // 2. Parameter validation
    const requiredFields = ['not_in_bed', 'time_to_sleep', 'put_away_phone', 'get_up'];
    if (requiredFields.some(field => newPrefs[field] === undefined)) {
      throw new Error("Missing required preference fields");
    }

    // 3. Execute update
    const result = await database.query(
      SQL.UPDATE_PREFERENCES,
      [
        newPrefs.not_in_bed,
        newPrefs.time_to_sleep,
        newPrefs.put_away_phone,
        newPrefs.get_up,
        listener.rows[0].id
      ]
    );

    if (!result.rows[0]) {
      throw new Error("Failed to update preferences");
    }

    return result.rows[0];
  } catch (error) {
    console.error(`[Notification Service] Failed to update preferences: ${error.message}`);
    throw new Error("Failed to update notification preferences");
  }
};

module.exports = {
  getPreferences,
  updatePreferences
};