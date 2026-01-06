const express = require("express");
const axios = require("axios");
const Camera = require("../models/Camera");

const router = express.Router();

/* Check if IP Webcam is reachable */
const checkCameraLive = async (url) => {
  try {
    await axios.get(url, { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
};

/* ADD CAMERA */
router.post("/", async (req, res) => {
  try {
    const { name, ip, port, latitude, longitude, locationName } = req.body;

    if (!name || !ip || !port) {
      return res.status(400).json({ message: "Name, IP, and Port are required" });
    }

    const mjpegUrl = `http://${ip}:${port}/video`;

    const isLive = await checkCameraLive(mjpegUrl);

    const camera = await Camera.create({
      name,
      ip,
      port,
      latitude,
      longitude,
      locationName,
      streamUrl: isLive ? mjpegUrl : null,
      status: isLive ? "LIVE" : "OFFLINE"
    });

    res.status(201).json(camera);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Camera registration failed" });
  }
});

/* GET CAMERAS */
router.get("/", async (_req, res) => {
  const cameras = await Camera.find().sort({ createdAt: -1 });
  res.json(cameras);
});

module.exports = router;
