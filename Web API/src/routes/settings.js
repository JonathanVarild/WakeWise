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

// Export the router module.
module.exports = router;
