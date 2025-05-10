const express = require("express");
const router = express.Router();
const systemService = require("../services/systemService");


router.post("/getSettings", async (req, res) => {
  try {
    const settings = await systemService.getSystemSettings();
    
    res.status(200).json({
      message: "System settings fetched successfully",
      settings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update timezone configuration
router.post("/updateTimezone", async (req, res) => {
  try {
    const { time_zone } = req.body;
    
    if (!time_zone) {
      return res.status(400).json({ message: "Missing time_zone parameter" });
    }

    console.log("Updating timezone to:", time_zone);
    
    const updatedSettings = await systemService.updateTimezone(time_zone);
    
    res.status(200).json({
      message: "Timezone updated successfully",
      settings: updatedSettings
    });
  } catch (error) {
    console.error("Timezone update error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// update theme configuration
router.post("/updateTheme", async (req, res) => {
  try {
    const { theme } = req.body;
    
    if (!theme || !["light", "dark", "auto"].includes(theme)) {
      return res.status(400).json({ message: "Invalid theme value" });
    }

    console.log("Updating theme to:", theme);
    
    const updatedSettings = await systemService.updateTheme(theme);
    
    res.status(200).json({
      message: "Theme updated successfully",
      settings: updatedSettings
    });
  } catch (error) {
    console.error("Theme update error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// get available timezones
router.post("/getTimezones", async (req, res) => {
  try {
    const timezones = await systemService.getAvailableTimezones();
    
    res.status(200).json({
      message: "Timezones fetched successfully",
      timezones
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;