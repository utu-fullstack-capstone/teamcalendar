// Feed Hashtags

const mongoose = require('mongoose');

const HashtagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Hashtag = mongoose.model('hashtag', HashtagSchema);
