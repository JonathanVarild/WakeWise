const database = require("../db");

async function updateMicSettings(before_sleep_delay_minutes, activation_threshold_db, recording_lifespan_days) {
	// 'MICRO',
	// '{
	// 	"before_sleep_delay_minutes": 10,
	// 	"activation_threshold_db": -40,
	// 	"recording_lifespan_days": 30
	// }'::jsonb

	if (before_sleep_delay_minutes !== undefined && (typeof before_sleep_delay_minutes !== "number" || before_sleep_delay_minutes < 0 || before_sleep_delay_minutes > 120)) {
		throw new Error("before_sleep_delay_minutes must be a positive number");
	}

	if (activation_threshold_db !== undefined && (typeof activation_threshold_db !== "number" || activation_threshold_db < -40 || activation_threshold_db > 90)) {
		throw new Error("activation_threshold_db must be a number between -40 and 90");
	}

	if (recording_lifespan_days !== undefined && (typeof recording_lifespan_days !== "number" || recording_lifespan_days < 0 || recording_lifespan_days > 90)) {
		throw new Error("recording_lifespan_days must be a positive number");
	}

	const result = await database.query(
		`UPDATE configuration_pairs
		   SET json_value = $1::jsonb
		   WHERE id = $2
		   RETURNING json_value`,
		[
			JSON.stringify({
				before_sleep_delay_minutes: before_sleep_delay_minutes,
				activation_threshold_db: activation_threshold_db,
				recording_lifespan_days: recording_lifespan_days,
			}),
			"MICRO",
		]
	);

	if (result.rows.length === 0) {
		throw new Error("Configuration not found");
	}

	return result.rows[0].json_value;
}

async function getMicSettings() {
	const result = await database.query(`SELECT json_value FROM configuration_pairs WHERE id = $1`, ["MICRO"]);
	return result.rows[0].json_value;
}

module.exports = { updateMicSettings, getMicSettings };
