<<<<<<< HEAD
const mongoose = require('mongoose');

=======
>>>>>>> origin/dev
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
<<<<<<< HEAD
  }
});

module.exports = User = mongoose.model('user', UserSchema);
=======
  },
  admin: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
>>>>>>> origin/dev
