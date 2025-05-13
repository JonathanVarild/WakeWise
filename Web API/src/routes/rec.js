const express = require("express");
const router = express.Router();
const recService = require("../services/recService");

router.post("/getRecordingsData", async (req, res) => {
  try {
    const recordings = await recService.getRecordingsData();

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

        const result = await recService.saveMetadata(id, file_name); 
        res.status(200).json(result); 

    } catch (error) {
        console.error("Error saving metadata:", error.message);
        res.status(500).json({ message: error.message }); 
    }
});

router.post("/setRecordingNotes", async (req, res) => {
    try {
      const { file_id, user_note } = req.body;
      console.log("Received data:", req.body);
      const result = await recService.setRecordingNotes(file_id, user_note);
      console.log("Backend result:", result); // Logga resultatet
      res.status(200).json(result); // Skicka JSON-respons
    } catch (error) {
      console.error("Error saving note:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/setRecordingFavorite", async (req, res) => {
    try {
      console.log("Received raw body:", req.body); // Logga hela request body

      const { file_id } = req.body; // Försök hämta file_id
      console.log("Extracted file_id:", file_id); // Logga file_id

      const result = await recService.setRecordingFavorite(file_id); // Anropa service-funktionen
      console.log("Backend result:", result);

      res.status(200).json(result); // Skicka JSON-respons
    } catch (error) {
      console.error("Error updating favorite:", error.message);
      res.status(500).json({ message: error.message }); // Skicka felmeddelande som JSON
    }
  });

  router.post("/removeRecordingFavorite", async (req, res) => {
    try {
      console.log("Routhandler for /removeRecordingFavorite called"); // Kontrollera att routhandlaren körs
      console.log("Received raw body:", req.body); // Logga hela request body

      const { file_id } = req.body; // Försök hämta file_id
      console.log("Extracted file_id:", file_id); // Logga file_id

      console.log("Calling removeRecordingFavorite in recService...");
      const result = await recService.removeRecordingFavorite(file_id); // Anropa service-funktionen
      console.log("Backend result:", result); // Logga resultatet från service-funktionen

      res.status(200).json(result); // Skicka JSON-respons
    } catch (error) {
      console.error("Error updating favorite:", error.message);
      res.status(500).json({ message: error.message }); // Skicka felmeddelande som JSON
    }
  });

  router.post("/deleteRecording", async (req,res) => {
    try {

      const {file_id} = req.body
      const result = await recService.deleteRecording(file_id);
      console.log("Deleted recording with id: ", file_id)

      res.status(200).json(result); 

    } catch (error) {

      console.error("Error deleting:", error.message);
      res.status(500).json({ message: error.message });

    }
  })

module.exports = router;