const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const clockService = require("../services/clockService");

router.post("/setClockSettings", async (req, res, next) => {
  try {
    const { username, userPassword } = req.body;

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    // Save settings using hashed password
    await clockService.setClockSettings(username, hashedPassword);

    res.status(200).json({
      message: "Successfully saved settings",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
