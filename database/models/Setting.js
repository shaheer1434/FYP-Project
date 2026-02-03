const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  sensitivity: { type: Number, default: 75 },
  quality: { type: String, default: "Full HD" },
  autoSave: { type: Boolean, default: true },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sound: { type: Boolean, default: true }
  }
}, { timestamps: true });

// Singleton pattern: Ensure we only ever have one settings document if needed, 
// or clean up old ones. For simplicity, we'll just query the first one found 
// or update an existing one.

module.exports = mongoose.model("Setting", SettingSchema);
