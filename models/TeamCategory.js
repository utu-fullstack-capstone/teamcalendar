const mongoose = require('mongoose');

const TeamCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = TeamCategory = mongoose.model(
  'teamcategory',
  TeamCategorySchema
);
