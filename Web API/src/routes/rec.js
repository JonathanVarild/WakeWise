const express = require("express");
const router = express.Router();
const recService = require("../services/recService");

router.post("/getMetadata", async (req, res) => {
  try {
    const recordings = await recService.getMetadata();

    res.status(200).json({
      message: "Recordings fetched successfully",
      recordings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/saveMetadata", async (req, res) => {
    try {
        const { id, file_name } = req.body; // Hämta id och file_name från request body
        console.log("Received data:", { id, file_name }); // Logga inkommande data

        const result = await recService.saveMetadata(id, file_name); // Anropa service-funktionen
        res.status(200).json(result); // Returnera framgångsmeddelande
    } catch (error) {
        console.error("Error saving metadata:", error.message);
        res.status(500).json({ message: error.message }); // Returnera felmeddelande
    }
});

module.exports = router;
