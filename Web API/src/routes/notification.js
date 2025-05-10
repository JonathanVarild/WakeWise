const express = require("express");
const router = express.Router();
const notificationService = require("../services/notificationService");

router.post("/getPreferences", async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = await notificationService.getPreferences(userId);
    res.status(200).json({
      success: true,
      data: preferences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post("/updatePreferences", async (req, res) => {
  try {
    const userId = req.user.id;
    const updated = await notificationService.updatePreferences(userId, req.body);
    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;