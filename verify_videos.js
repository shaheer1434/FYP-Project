const mongoose = require("mongoose");
const Incident = require("./database/models/Incident");
const fs = require("fs");
const path = require("path");

const checkVideos = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ipcams");
    console.log("\n========================================");
    console.log("📹 VIDEO STORAGE VERIFICATION");
    console.log("========================================\n");

    const incidents = await Incident.find({});
    
    if (incidents.length === 0) {
        console.log("❌ No incidents found in database yet.");
        console.log("\n💡 TIP: Record a video from Dashboard and save it as an incident.");
    } else {
        console.log(`✅ Found ${incidents.length} incident(s) with video data:\n`);
        
        incidents.forEach((incident, index) => {
            console.log(`--- Incident #${index + 1} ---`);
            console.log(`Type: ${incident.type}`);
            console.log(`Severity: ${incident.severity}`);
            console.log(`Duration: ${incident.duration} seconds`);
            console.log(`Video URL: ${incident.videoUrl || "No video"}`);
            console.log(`Location: [${incident.gps.coordinates[1]}, ${incident.gps.coordinates[0]}]`);
            console.log(`Detected At: ${incident.detectedAt}`);
            
            // Check if video file exists on disk
            if (incident.videoUrl) {
                const videoPath = path.join(__dirname, "backend", incident.videoUrl);
                const exists = fs.existsSync(videoPath);
                console.log(`File on Disk: ${exists ? "✅ EXISTS" : "❌ MISSING"}`);
                if (exists) {
                    const stats = fs.statSync(videoPath);
                    console.log(`File Size: ${(stats.size / 1024).toFixed(2)} KB`);
                }
            }
            console.log("-----------------------------------\n");
        });
        
        // Check uploads folder
        const uploadsDir = path.join(__dirname, "backend", "uploads");
        if (fs.existsSync(uploadsDir)) {
            const files = fs.readdirSync(uploadsDir);
            console.log(`\n📁 Files in /uploads folder: ${files.length}`);
            files.forEach(file => {
                const filePath = path.join(uploadsDir, file);
                const stats = fs.statSync(filePath);
                console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
            });
        }
    }

    console.log("\n========================================\n");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
};

checkVideos();
