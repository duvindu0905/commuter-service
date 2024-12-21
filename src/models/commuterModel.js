const mongoose = require('mongoose');

const commuterSchema = new mongoose.Schema({
  commuterId: { type: Number, required: true, unique: true },  // Unique identifier for the commuter
  commuterName: { type: String, required: true },
  commuterEmail: { type: String, required: true },
  nic: { type: String, required: true },
  mobileNumber: { type: Number, required: true },  // Added mobileNumber
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

// Automatically remove _id and __v from response
commuterSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;  // Remove _id
    delete ret.__v;  // Remove __v
    return ret;  // Return the transformed object
  },
});

const Commuter = mongoose.model('Commuter', commuterSchema);

module.exports = Commuter;
