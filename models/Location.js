const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number]
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Location = mongoose.model('location', LocationSchema);
