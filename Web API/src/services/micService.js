const database = require('../db');

async function updateMicSettings(newConfig) {
  const allowedFields = [
    'before_sleep_delay_minutes',
    'activation_threshold_db', 
    'recording_lifespan_days'
  ];
  
  const filteredConfig = {};
  for (const field of allowedFields) {
    if (newConfig[field] !== undefined) {
      filteredConfig[field] = newConfig[field];
    }
  }

  const result = await database.query(
    `UPDATE configuration_pairs
     SET json_value = json_value || $1::jsonb
     WHERE id = $2
     RETURNING json_value`,
    [filteredConfig, "MICRO"]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Configuration not found');
  }
  
  return result.rows[0].json_value;
}

async function getMicSettings() {
  const result = await database.query(
    `SELECT json_value FROM configuration_pairs WHERE id = $1`,
    ["MICRO"]
  );
  return result.rows[0].json_value;
}

module.exports = { updateMicSettings, getMicSettings };