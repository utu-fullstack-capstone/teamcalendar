const express = require('express');
const router = express.Router();

// @route   GET api/teams
// @desc    teams route
// @access  Public - no authentificaion!

router.get('/', (req, res) => {
  const jsonresponse = { message: 'teams route - backend' };
  res.json(jsonresponse);
});

module.exports = router;
