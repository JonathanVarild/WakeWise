const express = require("express");
const router = express.Router();
const recService = require("../services/recService");

router.get("/getMetadata", async (req, res) => {
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

module.exports = router;