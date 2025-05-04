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

router.post("/updateColor" , async (req,res) => {
    try {
        const {id, color_hex} = req.body;
        console.log("Received data: ", {id, color_hex});

        const result = await lightServices.updateColor(id, color_hex); 
        res.status(200).json(result); 

        }catch (error) {
            console.error("Error saving color:", error.message);
            res.status(500).json({ message: error.message }); 
        }
})



module.exports = router;
