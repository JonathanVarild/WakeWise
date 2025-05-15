const express = require("express");
const router = express.Router();
const displayService = require("../services/displayService");

const validateDisplaySettings = (req, res, next) => {
  const { 
    page_layouts,
    font_size,
    color
  } = req.body;

  const errors = [];
  
  if (page_layouts) {
    if (!Array.isArray(page_layouts)) {
      errors.push('page_layouts must be an array');
    } else {
      page_layouts.forEach((page, index) => {
        if (!Array.isArray(page) || page.length !== 4) {
          errors.push(`Page ${index + 1} must be an array of 4 elements`);
        }
        if (page.some(num => !Number.isInteger(num) || num < 1 || num > 8)) {
          errors.push(`Page ${index + 1} contains invalid module numbers (1-8 only)`);
        }
      });
    }
  }

  // if (font_size !== undefined && 
  //    (typeof font_size !== 'number' || font_size < 12 || font_size > 24)) {
  //   errors.push('font_size must be a number between 12 and 24');
  // }

  if (color && !/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    errors.push('color must be a valid hex color code');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};


router.post("/settings/setDisplaySettings", validateDisplaySettings, async (req, res) => {
  try {
    const updatedConfig = await displayService.updateDisplaySettings(req.body);
    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/settings/getDisplaySettings", async (req, res) => {
  try {
    const displayData = await displayService.getDisplaySettings();
    res.status(200).json(displayData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;