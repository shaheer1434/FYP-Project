const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

module.exports = (io) => {

  // GET all incidents
  router.get("/", async (req, res) => {
    try {
      const incidents = await Incident.find().sort({ detectedAt: -1 });
      res.status(200).json(incidents);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST new incident with video upload
  router.post("/", upload.single("video"), async (req, res) => {
    try {
      const { type, severity, latitude, longitude, cameraId, source, duration } = req.body;
      
      let videoUrl = "";
      if (req.file) {
        // Build relative path for frontend access
        videoUrl = `/uploads/${req.file.filename}`;
      }

      const incident = new Incident({
        type: type || "Suspicious Activity",
        severity: severity || "High",
        source: source || "Manual Capture",
        sourceId: cameraId || "Manual",
        gps: {
          type: "Point",
          coordinates: [parseFloat(longitude) || 0, parseFloat(latitude) || 0]
        },
        duration: parseInt(duration) || 0,
        videoUrl: videoUrl,
        status: "Open",
        snapshot: ""
      });

      await incident.save();

      if (io && typeof io.emit === "function") {
        io.emit("new-incident", incident);
      }

      res.status(201).json({ message: "Incident saved successfully", incident });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE all incidents (Reset for Exhibition)
  router.delete("/", async (req, res) => {
    try {
      await Incident.deleteMany({});
      // Optionally delete upload files too
      const files = fs.readdirSync(uploadDir);
      for (const file of files) {
        fs.unlinkSync(path.join(uploadDir, file));
      }
      res.status(200).json({ message: "All incidents and files cleared successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
