const database = require('../db');

async function updateDisplaySettings(newConfig) {
 
  console.log(newConfig);
  

  const result = await database.query(
    `UPDATE configuration_pairs
    SET json_value = $1::jsonb
     WHERE id = $2
     RETURNING json_value`,
    [newConfig, "DISPL"]
  );

  if (result.rows.length === 0) {
    throw new Error('Display configuration not found');
  }

  return result.rows[0].json_value;
}

async function getDisplaySettings() {
  const result = await database.query(
    `SELECT json_value FROM configuration_pairs WHERE id = $1`,
    ["DISPL"]
  );
  
  return result.rows[0]?.json_value;
}

module.exports = { 
  updateDisplaySettings,
  getDisplaySettings 
};