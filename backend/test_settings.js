const axios = require("axios");

const TEST_URL = "http://localhost:5000/api/settings";

async function testSettings() {
  try {
    console.log("1. GET Settings (should be default)...");
    let res = await axios.get(TEST_URL);
    console.log("GET Result:", res.data.sensitivity);

    console.log("2. PUT Settings (update sensitivity to 50)...");
    const newSettings = { sensitivity: 50, quality: "4K", autoSave: false };
    res = await axios.put(TEST_URL, newSettings);
    console.log("PUT Result:", res.data.sensitivity);

    console.log("3. Verify Update...");
    res = await axios.get(TEST_URL);
    if (res.data.sensitivity === 50) {
      console.log("SUCCESS: Settings updated and persisted!");
    } else {
      console.error("FAILURE: Settings did not persist.");
    }

  } catch (err) {
    console.error("Test Failed:", err.message);
  }
}

// Wait for server to start
setTimeout(testSettings, 3000);
