// backend/services/systemService.js
const database = require("../db");

const getSystemSettings = async () => {
    try {
      const result = await database.query(
        `SELECT json_value FROM configuration_pairs WHERE id = $1`,
        ['SYSSE']
      );
  
      if (result.rows.length === 0) {
        throw new Error("System configuration not found");
      }
  
      return result.rows[0].json_value;
    } catch (error) {
      throw new Error("Failed to fetch system settings: " + error.message);
    }
  };
  
  const updateTimezone = async (timezone) => {
    try {
      const result = await database.query(
        `UPDATE configuration_pairs 
         SET json_value = jsonb_set(
             json_value, '{time_zone}', $1::jsonb, true
         )
         WHERE id = $2
         RETURNING json_value`,
        [JSON.stringify(timezone), 'SYSSE']
      );
  
      return result.rows[0].json_value;
    } catch (error) {
      throw new Error("Failed to update timezone: " + error.message);
    }
  };
  
  const updateTheme = async (theme) => {
    try {
      const result = await database.query(
        `UPDATE configuration_pairs 
         SET json_value = jsonb_set(
             json_value, '{theme}', $1::jsonb, true
         )
         WHERE id = $2
         RETURNING json_value`,
        [JSON.stringify(theme), 'SYSSE']
      );
  
      return result.rows[0].json_value;
    } catch (error) {
      throw new Error("Failed to update theme: " + error.message);
    }
}

async function getAvailableTimezones() {
  try {
    return [
        'Europe/London',     
        'Europe/Paris',      
        'Europe/Berlin',     
        'Europe/Moscow',     
        'America/New_York',  
        'America/Chicago',  
        'America/Denver',    
        'America/Los_Angeles', 
        'Asia/Tokyo',        
        'Asia/Shanghai',    
        'Asia/Hong_Kong',   
        'Asia/Singapore',    
        'Australia/Sydney',  
        'Australia/Perth',  
        'Pacific/Auckland', 
        'Africa/Cairo',      
        'Africa/Johannesburg', 
        'Etc/UTC',          
        'Etc/GMT'          
      ].sort()
  } catch (error) {
    throw new Error("Failed to get timezones: " + error.message);
  }
}

module.exports = {
  getSystemSettings,
  updateTimezone,
  updateTheme,
  getAvailableTimezones
};