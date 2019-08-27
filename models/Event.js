const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
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
  start: {
    type: Date,
    required: true
  },
  end: {
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
      ref: 'team'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Event = mongoose.model('event', EventSchema);
