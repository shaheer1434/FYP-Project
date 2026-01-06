const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cameraRoutes = require("./routes/cameras");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/ipcams")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.use("/api/cameras", cameraRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
