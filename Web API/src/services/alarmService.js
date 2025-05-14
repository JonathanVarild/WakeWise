const database = require("../db");

async function updateAlarmSettings(newConfig) {
  try {
    const result = await database.query(
      `UPDATE configuration_pairs
             SET json_value = jsonb_set(
                 jsonb_set(json_value, '{wakeup_time}', $1::jsonb, true),
                 '{sleep_goal}', $2::jsonb, true
             )
             WHERE id = $3
             RETURNING json_value`,
      [
        JSON.stringify(newConfig.wakeup_time),
        JSON.stringify(newConfig.sleep_goal),
        "ALARM",
      ]
    );
    console.log(result);
    if (result.rows.length === 0) {
      throw new Error("Alarm configuration not found");
    }
    return result.rows[0].json_value;
  } catch (error) {
    throw new Error("Failed to update alarm settings: " + error.message);
  }
}

async function getAlarmSettings() {
  try {
    const result = await database.query(
      `SELECT json_value
             FROM configuration_pairs
             WHERE id ='ALARM'`
    );

    if (result.rows.length === 0) {
      throw new Error("No alarm settings found");
    }

    return result.rows[0].json_value;
  } catch (error) {
    throw new Error("Failed to fetch alarm settings: " + error.message);
  }
}

module.exports = {
  updateAlarmSettings,
  getAlarmSettings,
};
