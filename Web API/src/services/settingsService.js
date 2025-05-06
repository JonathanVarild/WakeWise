const database = require("../db");

async function setSoundSettings(volume, sound, fade) {
  const result = await database.query(
    `UPDATE configuration_pairs
           SET json_value = $1::jsonb
           WHERE id = $2
           RETURNING json_value`,
    [
      JSON.stringify({
        wakeup_sound: sound,
        volume: volume,
        fade_in_seconds: fade,
      }),
      "SOUND",
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Sound configuration not found");
  }
}

async function getSoundSettings() {
  const result = await database.query(
    "SELECT json_value FROM configuration_pairs WHERE id = 'SOUND'"
  );

  if (result.rows.length === 0) {
    throw new Error("Sound configuration not found");
  }
  return {
    sound: result.rows[0].json_value.wakeup_sound,
    volume: result.rows[0].json_value.volume,
    fade: result.rows[0].json_value.fade_in_seconds,
  };
}

module.exports = {
  setSoundSettings,
  getSoundSettings,
};
