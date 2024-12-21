const express = require('express');
const router = express.Router();
const commuterController = require('../controllers/commuterController');

// Route to create a new commuter
router.post('/commuters', commuterController.createCommuter);

// Route to get all commuters
router.get('/commuters', commuterController.getAllCommuters);

// Route to get a commuter by commuterId
router.get('/commuters/:commuterId', commuterController.getCommuterById);

module.exports = router;

