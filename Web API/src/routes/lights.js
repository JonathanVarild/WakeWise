const express = require("express");
const router = express.Router();
const lightServices = require("../services/lightServices");


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
        console.log("Hej")
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



module.exports = router;
