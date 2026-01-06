// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "shieldai", // Your database name
    });
    console.log("✅ MongoDB connected to shieldai");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop server if connection fails
  }
};

module.exports = connectDB;
