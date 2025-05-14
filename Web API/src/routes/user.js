const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userService = require("../services/userService");

router.post("/setUserSettings", async (req, res, next) => {
  try {
    const { username, userPassword, isAdmin } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    await userService.setUserSettings(username, hashedPassword, Boolean(isAdmin));

    res.status(200).json({ message: "Successfully saved user settings" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
