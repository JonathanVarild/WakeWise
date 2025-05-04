const database = require("../db");

async function getColorsData() {
  try {
    const result = await database.query(
      `SELECT * 
            FROM lights;`
    );

    console.log("Hej");
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

module.exports = {
  getColorsData,
  updateColor,
};
