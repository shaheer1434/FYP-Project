const express = require("express");
const router = express.Router();
const User = require("../../database/models/User");

// POST /api/users/sync - Sync user data from Firebase
router.post("/sync", async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ message: "UID and email are required" });
    }

    const user = await User.findOneAndUpdate(
      { uid },
      {
        $set: {
            email,
            displayName,
            photoURL,
            lastLogin: new Date()
        },
        $setOnInsert: { createdAt: new Date() }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(user);
  } catch (err) {
    console.error("Error syncing user:", err);
    res.status(500).json({ message: "Failed to sync user data" });
  }
});

module.exports = router;
