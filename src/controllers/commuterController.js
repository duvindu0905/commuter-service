const Commuter = require('../models/commuterModel');  // Import the Commuter model

// Function to create a new commuter
const createCommuter = async (req, res) => {
  const { commuterId, commuterName, commuterEmail, nic, mobileNumber } = req.body;

  // Validate required fields
  if (!commuterId || !commuterName || !commuterEmail || !nic || !mobileNumber) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    // Create a new commuter using the provided data
    const newCommuter = new Commuter({
      commuterId,
      commuterName,
      commuterEmail,
      nic,
      mobileNumber,
    });

    // Save the new commuter to the database
    await newCommuter.save();

    // Return success response
    res.status(201).json({
      message: 'Commuter created successfully',
      commuter: newCommuter,
    });
  } catch (error) {
    console.error('Error creating commuter:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to get all commuters
const getAllCommuters = async (req, res) => {
  try {
    const commuters = await Commuter.find();
    res.status(200).json(commuters);
  } catch (error) {
    console.error('Error fetching commuters:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to get a commuter by commuterId
const getCommuterById = async (req, res) => {
  const { commuterId } = req.params;

  try {
    const commuter = await Commuter.findOne({ commuterId });
    if (!commuter) {
      return res.status(404).json({ message: 'Commuter not found' });
    }
    res.status(200).json(commuter);
  } catch (error) {
    console.error('Error fetching commuter by commuterId:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCommuter,
  getAllCommuters,
  getCommuterById,
};
