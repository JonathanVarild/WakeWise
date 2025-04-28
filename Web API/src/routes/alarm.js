const express = require("express");
const router = express.Router();
const alarmService = require("../services/alarmService");

router.put("/settingAlarm", async (req, res) => {
    try {
        const { wakeup_time, sleep_goal } = req.body;

        // Anropa rätt funktion från alarmService
        const updatedConfig = await alarmService.updateAlarmSettings(req.body);
        

        res.status(200).json({ message: "Alarm settings updated successfully", updatedConfig });
        console.log("Received data:", req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
        throw error;
    }
});

router.get("/getAlarm", async (req, res) => {
    try {

        const alarmData = await alarmService.getAlarmSettings();

        res.status(200).json({ message: "Alarm settings fetched successfully", alarmData });
    } catch (error) {
        res.status(500).json({ message: error.message });
        throw error;
    }
});

module.exports = router;