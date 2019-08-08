const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  coach: {
    type: String,
    required: true
  },
  contact: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Team = mongoose.model('team', TeamSchema);
