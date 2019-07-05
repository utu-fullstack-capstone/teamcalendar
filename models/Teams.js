const mongoose require('mongoose')

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  liga: {
    type: String,
    required: true
  },
  teamsClass: {
    type: String,
    required: true
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'players'
    }
  ]
})

module.exports = Team = mongoose.model('team', TeamSchema)