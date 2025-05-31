const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createStation,
  getStations,
  updateStation,
  deleteStation
} = require('../controllers/stationController');

router.post('/', auth, createStation);         // Create
router.get('/', getStations);                  // Read all
router.put('/:id', auth, updateStation);       // Update
router.delete('/:id', auth, deleteStation);    // Delete

module.exports = router;
