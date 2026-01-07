const express = require("express");
const router = express.Router();
const Incident = require("../models/incident");

// Pass io as argument
module.exports = (io) => {

  // POST new incident
  router.post("/", async (req, res) => {
    try {
      const { type, severity, latitude, longitude, cameraId } = req.body;

      const radiusBySeverity = { Low: 100, Medium: 300, High: 500 };
      const impactRadius = radiusBySeverity[severity] || 300;

      const incident = new Incident({
        type,
        severity,
        impactRadius,
        source: "IP Webcam",
        camera: cameraId || null,
        gps: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        status: "Open",
        snapshot: ""
      });

      await incident.save();

      // Emit new incident to all connected clients
      io.emit("new-incident", incident);

      res.status(201).json({ message: "Incident saved successfully", incident });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
};
