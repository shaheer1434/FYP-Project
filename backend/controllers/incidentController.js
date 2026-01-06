const Incident = require("../models/Incident");

const addIncident = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({ message: "Incident saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addIncident,
  getIncidents
};
