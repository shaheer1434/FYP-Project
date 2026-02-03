const mongoose = require("mongoose");

// Adjust path if needed based on where you run this script
const User = require("./database/models/User");

const checkUsers = async () => {
  try {
    // Connect to the same database as your app
    await mongoose.connect("mongodb://127.0.0.1:27017/ipcams");
    console.log("\n--- Checking MongoDB 'users' collection ---\n");

    const users = await User.find({});
    
    if (users.length === 0) {
        console.log("No users found in the database yet.");
    } else {
        console.log(`Found ${users.length} user(s):`);
        users.forEach(user => {
            console.log(`\nUID: ${user.uid}`);
            console.log(`Email: ${user.email}`);
            console.log(`Name: ${user.displayName}`);
            console.log(`Last Login: ${user.lastLogin}`);
            console.log("-----------------------------------");
        });
    }

    console.log("\n--- End of List ---\n");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
};

checkUsers();
