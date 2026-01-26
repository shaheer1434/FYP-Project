const express = require("express");
const router = express.Router();
const Setting = require("../../database/models/Setting");

// GET /api/settings - Fetch current settings (create default if missing)
router.get("/", async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
});

// PUT /api/settings - Update settings
router.put("/", async (req, res) => {
  try {
    const { sensitivity, quality, autoSave, notifications } = req.body;
    
    // updateOne with upsert option ensures we update the existing doc or create one
    // But since we want to return the updated doc, findOneAndUpdate is better
    const updatedSettings = await Setting.findOneAndUpdate(
      {}, // filter (match any/first)
      { $set: { sensitivity, quality, autoSave, notifications } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(updatedSettings);
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).json({ message: "Failed to update settings" });
  }
});

module.exports = router;
