const express = require("express");
const router = express.Router();
const lightServices = require("../services/lightService");


router.post("/getColors", async(req, res) => {
    try {
        const colors = await lightServices.getColorsData();

        res.status(200).json({
            message: "Colors fetched successfully",
            colors,
          });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
})

router.post("/updateColor", async (req, res) => {
    try {

        const { id, color_hex, color_rgb } = req.body;
        if (!id || !color_hex) {
            return res.status(400).json({ message: "Missing id or color_hex" });
        }

        console.log("Received data: ", { id, color_hex, color_rgb });

        const result = await lightServices.updateColor(id, color_hex, color_rgb);

        // Skicka tillbaka resultatet från lightServices
        res.status(200).json(result);
    } catch (error) {
        console.error("Error updating color:", error.message);
        res.status(500).json({ message: error.message });
    }
});

router.post("/updateBrightness", async (req, res) => {
    try {
      console.log("Request body:", req.body); // Logga hela request body
      const { brightness } = req.body; 
  
      if (brightness === undefined || brightness === null) {
        return res.status(400).json({ message: "Missing brightness value" });
      }
  
      console.log("Received brightness in /updateBrightness:", brightness);
  
      const updatedBrightness = await lightServices.updateBrightness({ brightness });
  
      res.status(200).json({
        updatedBrightness,
      });
    } catch (error) {
      console.error("Error updating brightness:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/getBrightness", async (req, res) => {
    try {
      const brightness = await lightServices.getBrightness();
      res.status(200).json({
        brightness,

      });
    } catch (error) {
      console.error("Error fetching brightness:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/updateColorsdata", async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const { color } = req.body; 
  
      if (color === undefined || color === null) {
        return res.status(400).json({ message: "Missing color value" });
      }
  
      console.log("Received Color in /updateColorsData:", color);
  
      const updatedColors = await lightServices.updateColorsData({ color });
  
      res.status(200).json({
        message: "Color updated successfully",
        updatedColors,
      });
    } catch (error) {
      console.error("Error updating color:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/getSavedId", async (req, res) => {
    try {
      const id = await lightServices.getSavedId(); // Hämta id från tjänsten
      res.status(200).json({
        id, // Returnera id
      });
    } catch (error) {
      console.error("Error fetching id:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  

module.exports = router;
