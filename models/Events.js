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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teams'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('events', EventsSchema);
