const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const settingsService = require("../services/settingsService");
const { settings } = require("../app");

router.post("/setsound", authService.verifyJWT, async (req, res, next) => {
  const { volume, sound, fade } = req.body;
  await settingsService.setSoundSettings(volume, sound, fade);
  res.status(200).json({
    message: "Successfully saved settings",
  });
});

router.post("/getsound", authService.verifyJWT, async (req, res, next) => {
  // Get available users.
  const retrievedSettings = await settingsService.getSoundSettings();

  // Return token to client.
  res.status(200).json({
    message: "Successfully retrieved users.",
    ...retrievedSettings,
  });
});

router.post("/setscreentime", authService.verifyJWT, async (req, res, next) => {
  const { pre_sleep_min, post_sleep_min, alertType } = req.body;
  await settingsService.setScreentimeSettings(
    pre_sleep_min,
    post_sleep_min,
    alertType
  );
  res.status(200).json({
    message: "Successfully saved settings",
  });
});

router.post("/getscreentime", authService.verifyJWT, async (req, res, next) => {
  // Get available users.
  const retrievedSettings = await settingsService.getScreentimeSettings();

  // Return token to client.
  res.status(200).json({
    message: "Successfully retrieved users.",
    ...retrievedSettings,
  });
});

router.post("/setroutines", authService.verifyJWT, async (req, res, next) => {
  const { max_time_in_bed, must_be_in_bed_time } = req.body;

  await settingsService.setRoutineSettings(
    max_time_in_bed,
    must_be_in_bed_time
  );

  res.status(200).json({
    message: "Successfully saved routine settings",
  });
});

router.post("/getroutines", authService.verifyJWT, async (req, res, next) => {
  const retrievedSettings = await settingsService.getRoutineSettings();

  res.status(200).json({
    message: "Successfully retrieved routine settings.",
    ...retrievedSettings,
  });
});

// Export the router module.
module.exports = router;
