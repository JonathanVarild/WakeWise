const database = require('../db');

async function updateDisplaySettings(newConfig) {
  const allowedFields = [
    'page_layouts',
    'font_size',
    'color'
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
    [filteredConfig, "DISPL"]
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
  
  
  return result.rows[0]?.json_value || {
    page_layouts: [[1,2,3,4], [5,6,7,8]],
    font_size: 14,
    color: '#ff7626'
  };
}

module.exports = { 
  updateDisplaySettings,
  getDisplaySettings 
};