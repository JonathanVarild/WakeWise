const express = require("express");
const router = express.Router();
const micService = require("../services/micService");

const validateMicSettings = (req, res, next) => {
  const { 
    before_sleep_delay_minutes, 
    activation_threshold_db, 
    recording_lifespan_days 
  } = req.body;

  const errors = [];
  
  if (before_sleep_delay_minutes !== undefined && 
     (typeof before_sleep_delay_minutes !== 'number' || before_sleep_delay_minutes < 0)) {
    errors.push('before_sleep_delay_minutes must be a positive number');
  }

  if (activation_threshold_db !== undefined && 
     (typeof activation_threshold_db !== 'number' || activation_threshold_db < 0)) {
    errors.push('activation_threshold_db must be a positive number');
  }

  if (recording_lifespan_days !== undefined && 
     (typeof recording_lifespan_days !== 'number' || recording_lifespan_days < 0)) {
    errors.push('recording_lifespan_days must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

router.put("/settings/microphone", validateMicSettings, async (req, res) => {
  try {
    const updatedConfig = await micService.updateMicSettings(req.body);
    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/settings/microphone", async (req, res) => {
  try {
    const micData = await micService.getMicSettings();
    res.status(200).json(micData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;