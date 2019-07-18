const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  team: {
    type: String,
    required: true
  },
  teamClass: {
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
  date: {
    type: Date,
    default: Date.now
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'players'
    }
  ]
});

module.exports = Team = mongoose.model('team', TeamSchema);
