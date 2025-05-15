const express = require("express");
const router = express.Router();
const statisticsService = require("../services/statisticsService");

router.post("/getAccuracy", async (req, res) => {
  try {
    const data = await statisticsService.getAccuracy();
    console.log("Fetched statistics", data);
    res.status(200).json({
      message: "Statistics fetched successfully",
      accuracy: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/getAvrgTemp", async (req, res) => {
  try {
    const data = await statisticsService.getAvrgTemp();
    console.log("Fetched statistics", data);
    res.status(200).json({
      message: "Statistics fetched successfully",
      temp: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/getTemp", async (req, res) => {
  try {
    const data = await statisticsService.getTemp();
    console.log("Fetched statistics", data);
    res.status(200).json({
      message: "Statistics fetched successfully",
      temp: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/getPhoneData", async (req, res) => {
  try {
    const data = await statisticsService.getPhoneData();
    console.log("Fetched phoneData", data);
    res.status(200).json({
      message: "Statistics fetched successfully",
      phone_usage: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/getHabitsScreenTime", async (req, res) => {
    try {
        const data = await statisticsService.getHabitsScreenTime();
        console.log("Fetched screentime", data)
        res.status(200).json({
            message: "Statistics fetched successfully",
            screen_time: data,
          });
          console.log("HEEEEEEJ ", data);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
})


router.post("/getScoreData", async (req, res) => {
  try {
    const data = await statisticsService.getScoreData();
    console.log("Fetched statistics", data);
    res.status(200).json({
      message: "Statistics fetched successfully",
      score: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/getSleepData", async (req, res) => {
  try {
    const data = await statisticsService.getSleepData();
    console.log("Fetched statistics!!!!!!", data);
    res.status(200).json({
      message: "Statistics fetched successfully",
      sleepReg: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/getDreamNotes", async (req, res) => {
  try {
    const data = await statisticsService.getDreamNotes();
    res.status(200).json({
      message: "Dream notes fetched successfully",
      notes: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/setUserNotes", async (req, res) => {
    try {
      const { user_note } = req.body;
      console.log("Received data:", req.body);
      const result = await statisticsService.setUserNote(user_note);
      console.log("Backend result:", result); 
      res.status(200).json({
        message: "Statistics fetched successfully",
        user_notes: result,
      })
    } catch (error) {
      console.error("Error saving note:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/getAvrgTempNight", async (req, res) => {
    try {
      const data = await statisticsService.getAvrgTempNight();
      console.log("Backend result:", data); 
      res.status(200).json({
        message: "NightTemp successfully",
      average_temperature: data.average_temperature,
     average_humidity: data.average_humidity,

      });
    } catch (error) {
      console.error("Error fetching avrg temp night:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
