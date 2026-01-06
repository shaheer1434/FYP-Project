const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Suspicious Activity"],
    required: true
  },

  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "High"
  },

  source: {
    type: String,
    default: "IP Webcam"
  },

  camera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camera"
  },

  gps: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },

  snapshot: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: ["Open", "Resolved"],
    default: "Open"
  },

  detectedAt: {
    type: Date,
    default: Date.now
  }
});

incidentSchema.index({ gps: "2dsphere" });

module.exports = mongoose.model("Incident", incidentSchema);
