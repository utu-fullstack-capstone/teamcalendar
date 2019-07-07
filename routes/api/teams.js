const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Team = require('../../models/Teams');

// post teams

router.post(
  '/',
  [
    check('team', 'Team name is required!')
      .not()
      .isEmpty(),
    check('city', 'City is required!')
      .not()
      .isEmpty(),
    check('teamsClass', 'Class is required!')
      .not()
      .isEmpty(),
    check('trainer', 'Trainer is required!')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { team, city, teamsClass, trainer } = req.body;

    try {
      // See if team existst
      let teamName = await Team.findOne({ team });
      if (teamName) {
        res
          .status(400)
          .json({ errors: [{ message: 'Team already registered!' }] });
      }

      teamName = new Team({
        team,
        city,
        teamsClass,
        trainer
      });
      /*
      // encrypt password
      const salt = await bcrypt.genSalt(10);

      teamName.password = await bcrypt.hash(password, salt);
*/
      await teamName.save();

      // return jsonwebtoken
      const payload = {
        team: {
          id: team.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
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
