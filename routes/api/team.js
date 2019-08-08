const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Team = require('../../models/Team');
const User = require('../../models/User');

// @Route   GET api/teams
// @desc    Get all teams
// @Access  Public
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ Route  GET api/teams/:id
// @ Desc   Get team by id
// @ access Public
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    res.json(team);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Team not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @ Route  POST api/teams
// @ Desc   Create teams
// @ access Admin
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('city', 'City is required')
      .not()
      .isEmpty(),
    check('coach', 'Coach is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, city, coach } = req.body;

    try {
      // check admin rights
      const account = await User.findById(req.user.id).select('-password');

      if (account.admin) {
        let team = await Team.findOne({ name });
        if (team) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Team already exists!' }] });
        }

        team = new Team({
          name,
          city,
          coach
        });
        await team.save();
        res.json(team);
        console.log('Team saved');
      } else {
        return res.status(401).json({ msg: 'Access denied' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @Route   DELETE api/teams/:id
// @desc    Delete user by id
// @Access  Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const account = await User.findById(req.user.id).select('-password');
    if (account.admin) {
      await Team.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Team deleted' });
    } else {
      return res.status(401).json({ msg: 'Access denied' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
