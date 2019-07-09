const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Team = require('../../models/Teams');
const User = require('../../models/User');

// @ Route  GET api/teams/user
// @ Desc   GET current team
// @ access Private

router.get('/user', auth, async (req, res) => {
  try {
    const team = await Team.findOne({ user: req.user.id }).populate('user', [
      'name',
      'email'
    ]);
    if (!team) {
      return res
        .status(400)
        .json({ msg: 'There is no team linked to the user' });
    }
    res.json(team);
  } catch (error) {
    console.error(err.message);
    res.status(400).send('Server error');
  }
});

// @ Route  POST api/teams
// @ Desc   Create or update teams
// @ access Private

router.post(
  '/',
  auth,
  [
    check('team', 'Team is required')
      .not()
      .isEmpty(),
    check('city', 'City is required')
      .not()
      .isEmpty(),
    check('coach', 'Choach is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { team, city, coach, teamClass, players } = req.body;

    // Build team object
    const teamFields = {};
    teamFields.user = req.user.id;

    if (team) teamFields.team = team;
    if (city) teamFields.city = city;
    if (coach) teamFields.coach = coach;
    if (teamClass) teamFields.teamClass = teamClass;
    if (players) teamFields.players = players;

    try {
      let team = await Team.findOne({ user: req.user.id });

      if (team) {
        // Update
        team = await Team.findOneAndUpdate(
          { user: req.user.id },
          { $set: teamFields },
          { new: true }
        );

        return res.json(team);
      }

      // Create

      team = new Team(teamFields);
      await team.save();
      res.json(team);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
