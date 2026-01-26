const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
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

  sourceId: {
    type: String,
    default: "Unknown"
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

  videoUrl: {
    type: String,
    default: ""
  },

  duration: {
    type: Number,
    default: 0
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
