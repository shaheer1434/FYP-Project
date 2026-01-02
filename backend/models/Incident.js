const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  incidentType: String,
  confidenceScore: Number,
  city: String,
  detectedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Incident", IncidentSchema);
