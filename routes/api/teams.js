const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// post teams

router.post(
  '/',
  [
    check('team', 'Team name is required!')
      .not()
      .isEmpty(),
    check('city', 'City is required!')
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('Teams Route');
  }
);

// @route   GET api/teams
// @desc    teams route
// @access  Public - no authentificaion!

router.get('/', (req, res) => {
  const jsonresponse = { message: 'teams route - backend' };
  res.json(jsonresponse);
});

module.exports = router;
