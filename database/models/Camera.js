const mongoose = require("mongoose");

const CameraSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ip: { type: String, required: true },
    port: { type: String, required: true },
    locationName: String,
    latitude: Number,
    longitude: Number,

    streamUrl: { type: String, default: null },
    status: { type: String, enum: ["LIVE", "OFFLINE"], default: "OFFLINE" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Camera", CameraSchema);
