const express = require("express");
const router = express.Router();
const micService = require("../services/micService");

router.post("/settings/setMicSettings", async (req, res) => {
	const { before_sleep_delay_minutes, activation_threshold_db, recording_lifespan_days } = req.body;

	const updatedConfig = await micService.updateMicSettings(before_sleep_delay_minutes, activation_threshold_db, recording_lifespan_days);
	
	res.status(200).json(updatedConfig);
});

router.post("/settings/getMicSettings", async (req, res) => {
	const micData = await micService.getMicSettings();
	res.status(200).json(micData);
});

module.exports = router;
