const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  category: {
    type: String
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teams'
    }
  ]
});

module.exports = Profile = mongoose.model('events', EventsSchema);
