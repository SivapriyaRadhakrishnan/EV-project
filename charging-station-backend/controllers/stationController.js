const ChargingStation = require('../models/ChargingStation');

// Create station
exports.createStation = async (req, res) => {
  try {
    const station = new ChargingStation({ ...req.body, createdBy: req.user.id });
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all stations
exports.getStations = async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update station
exports.updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete station
exports.deleteStation = async (req, res) => {
  try {
    await ChargingStation.findByIdAndDelete(req.params.id);
    res.json({ message: "Station deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
