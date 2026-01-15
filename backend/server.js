const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cameraRoutes = require("./routes/cameraRoutes");
const incidentRoutes = require("./routes/incidentroutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/ipcams")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.use("/api/cameras", cameraRoutes);
app.use("/api/incidents", incidentRoutes(null));

app.listen(5000, () => console.log("Server running on port 5000"));
