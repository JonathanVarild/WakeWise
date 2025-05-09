const express = require("express");
const router = express.Router();
const lightServices = require("../services/lightService");

router.post("/getColors", async (req, res) => {
	const colors = await lightServices.getColorsData();

	res.status(200).json({
		message: "Colors fetched successfully",
		colors,
	});
});

router.post("/getSunrise", async (req, res) => {
	const sunrise = await lightServices.getSunrise();

	res.status(200).json({
		message: "Sunrise fetched successfully",
		sunrise,
	});
});

router.post("/updateSunrise", async (req, res) => {
	console.log("Request body:", req.body);
	const { fade_in_minutes } = req.body;

	console.log("Received sunrise in /updateSunrise:", fade_in_minutes);

	const updatedSunrise = await lightServices.updateSunrise({
		fade_in_minutes,
	});

	res.status(200).json({
		message: "Sunrise updated successfully",
		sunrise: updatedSunrise,
	});
});

router.post("/updateBrightness", async (req, res) => {
	const { brightness } = req.body;

	if (brightness === undefined || brightness === null) {
		return res.status(400).json({ message: "Missing brightness value" });
	}

	console.log("Received brightness in /updateBrightness:", brightness);

	const updatedBrightness = await lightServices.updateBrightness({
		brightness,
	});

	res.status(200).json({
		brightness: updatedBrightness,
	});
});

router.post("/getBrightness", async (req, res) => {
	const brightness = await lightServices.getBrightness();
	res.status(200).json({
		brightness,
	});
});

router.post("/updateColor", async (req, res) => {
	const { id, color_hex, color_rgb } = req.body;
	if (!id || !color_hex) {
		return res.status(400).json({ message: "Missing id or color_hex" });
	}

	console.log("Received data: ", { id, color_hex, color_rgb });

	const result = await lightServices.updateColor(id, color_hex, color_rgb);

	res.status(200).json(result);
});

router.post("/updateColorsdata", async (req, res) => {
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
});

router.post("/getSavedId", async (req, res) => {
	const id = await lightServices.getSavedId();
	res.status(200).json({
		id,
	});
});

module.exports = router;
