const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cameraRoutes = require("./routes/cameraRoutes");
const incidentRoutes = require("./routes/incidentroutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const connectDB = require("../database/db");
connectDB();

app.use("/api/cameras", cameraRoutes);
app.use("/api/incidents", incidentRoutes(null));
app.use("/api/settings", require("./routes/settingRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
