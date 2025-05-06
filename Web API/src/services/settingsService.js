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

async function setScreentimeSettings(pre_sleep_min, post_sleep_min, alertType) {
  const result = await database.query(
    `UPDATE configuration_pairs
               SET json_value = $1::jsonb
               WHERE id = $2
               RETURNING json_value`,
    [
      JSON.stringify({
        allowed_before_wake_minutes: pre_sleep_min,
        allowed_after_wake_minutes: post_sleep_min,
        alert_type: alertType,
      }),
      "SCRNT",
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Screentime configuration not found");
  }
}

async function getScreentimeSettings() {
  const result = await database.query(
    "SELECT json_value FROM configuration_pairs WHERE id = 'SCRNT'"
  );

  if (result.rows.length === 0) {
    throw new Error("Screentime configuration not found");
  }
  return {
    pre_sleep_min: result.rows[0].json_value.allowed_before_wake_minutes,
    post_sleep_min: result.rows[0].json_value.allowed_after_wake_minutes,
    alertType: result.rows[0].json_value.alert_type,
  };
}

async function setRoutineSettings(max_time_in_bed, must_be_in_bed_time) {
  const result = await database.query(
    `UPDATE configuration_pairs
                 SET json_value = $1::jsonb
                 WHERE id = $2
                 RETURNING json_value`,
    [
      JSON.stringify({
        max_time_in_bed_after_wakeup_minutes: max_time_in_bed,
        must_be_in_bed_before_minutes: must_be_in_bed_time,
      }),
      "ROUTN",
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Routine configuration not found");
  }
}

async function getRoutineSettings() {
  const result = await database.query(
    "SELECT json_value FROM configuration_pairs WHERE id = 'ROUTN'"
  );

  if (result.rows.length === 0) {
    throw new Error("Routine configuration not found");
  }
  return {
    must_be_in_bed_time:
      result.rows[0].json_value.must_be_in_bed_before_minutes,
    max_time_in_bed:
      result.rows[0].json_value.max_time_in_bed_after_wakeup_minutes,
  };
}

module.exports = {
  setSoundSettings,
  getSoundSettings,
  setScreentimeSettings,
  getScreentimeSettings,
  setRoutineSettings,
  getRoutineSettings,
};
