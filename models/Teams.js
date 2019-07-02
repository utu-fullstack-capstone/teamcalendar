const mongoose require('mongoose')

const TeamSchema = new mongoose.Schema({
  name: {
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