const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Team = require('../../models/Teams');

// @route   GET api/auth
// @desc    Test route
// @access  Public - no authentificaion!
router.get('/', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.teamName.id);
    res.json(team);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
