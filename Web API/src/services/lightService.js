const database = require("../db");

async function getColorsData() {
  try {
    const result = await database.query(
      `SELECT * 
            FROM lights
            ORDER BY id;`
    );

    return result.rows;
  } catch (error) {
    throw new Error("Failed to get colors: " + error.message);
  }
}

async function updateColor(id, color_hex, color_rgb) {
  try {
    const result = await database.query(
      `UPDATE lights
            SET color_hex = $1, color_rgb=$2
            WHERE id = $3;`,
      [color_hex, color_rgb, id]
    );
    console.log("Updated color in database:", { id, color_hex, color_rgb });
    return { message: "Color updated successfully", id, color_hex, color_rgb };
  } catch (error) {
    throw new Error("Failed to update color: " + error.message);
  }
}



async function updateBrightness(newConfig) {
  try {
    const result = await database.query(
      `UPDATE configuration_pairs
       SET json_value = jsonb_set(
           json_value, '{brightness}', $1::jsonb, true
       )
       WHERE id = $2
       RETURNING json_value`,
      [JSON.stringify(newConfig.brightness), "LIGHT"]
    );

    console.log("Updated brightness in database:", result.rows);

    if (result.rows.length === 0) {
      throw new Error("Light configuration not found");
    }

    return result.rows[0].json_value;
  } catch (error) {
    throw new Error("Failed to update brightness: " + error.message);
  }
}

async function getBrightness() {
  try {
    const result = await database.query(
      `SELECT json_value->>'brightness' AS brightness
       FROM configuration_pairs
       WHERE id = $1`,
      ["LIGHT"]
    );

    if (result.rows.length === 0) {
      throw new Error("Light configuration not found");
    }

    console.log("Fetched brightness from database:", result.rows[0].brightness);
    return result.rows[0].brightness;
  } catch (error) {
    throw new Error("Failed to fetch brightness: " + error.message);
  }
}

async function updateSunrise(newConfig) {
  try {
    const result = await database.query(
      `UPDATE configuration_pairs
       SET json_value = jsonb_set(
           json_value, '{fade_in_minutes}', $1::jsonb, true
       )
       WHERE id = $1
       RETURNING json_value`,
      [JSON.stringify(newConfig.fade_in_minutes), "LIGHT"]
    );

    console.log("Updated fade_in_minutes in database:", result.rows);

    if (result.rows.length === 0) {
      throw new Error("Light configuration not found");
    }

    return result.rows[0].json_value;
  } catch (error) {
    throw new Error("Failed to update fade_in_minutes: " + error.message);
  }
}

async function getSunrise() {
  try {
    const result = await database.query(
      `SELECT json_value->>'fade_in_minutes' AS fade_in_minutes
       FROM configuration_pairs
       WHERE id = $1`,
      ["LIGHT"]
    );
    

    if (result.rows.length === 0) {
      throw new Error("Light configuration not found");
    }

    console.log("Fetched brightness from database:", result.rows[0].fade_in_minutes);
    return result.rows[0].sunrise;
  } catch (error) {
    throw new Error("Failed to fetch brightness: " + error.message);
  }
}


async function getSavedId() {
  try {
    const result = await database.query(
      `SELECT json_value->'color'->>'id' AS id
       FROM configuration_pairs
       WHERE id = $1`,
      ["LIGHT"]
    );

    if (result.rows.length === 0) {
      throw new Error("ID not found");
    }

    console.log("Fetched id from database:", result.rows[0].id); // Logga id
    return result.rows[0].id; // Returnera endast color.id
  } catch (error) {
    throw new Error("Failed to fetch id: " + error.message);
  }
}

async function updateColorsData(newConfig) {
  try {
    console.log("Received color for update:", newConfig.color); // Logga värdet

    const result = await database.query(
      `UPDATE configuration_pairs
       SET json_value = jsonb_set(
           json_value, '{color}', $1::jsonb, true
       )
       WHERE id = $2
       RETURNING json_value`,
      [JSON.stringify(newConfig.color), "LIGHT"]
    );

    console.log("Updated color in database:", result.rows);

    if (result.rows.length === 0) {
      throw new Error("Light configuration not found");
    }

    return result.rows[0].json_value;
  } catch (error) {
    throw new Error("Failed to update brightness: " + error.message);
  }
}

module.exports = {
  getColorsData,
  updateColor,
  updateBrightness,
  updateColorsData,
  getBrightness,
  getSavedId,
  getSunrise,
  updateSunrise,

};
