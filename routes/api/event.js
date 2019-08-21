const express = require('express');
const config = require('config');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Event = require('../../models/Event.js');

// @Route   POST api/event
// @desc    Post new event
// @Access  User
router.post(
  '/',
  auth,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('location', 'Location is required')
      .not()
      .isEmpty(),
    check('from', 'Date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      location,
      from,
      to,
      category,
      teams
    } = req.body;

    try {
      let event = await Event.findOne({ title });
      if (event) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Team already exists!' }] });
      }
      const newEvent = new Event({
        title,
        description,
        location,
        from,
        to,
        category,
        teams
      });

      await newEvent.save();
      console.log('Event saved!');
      res.json(newEvent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route   GET api/event/:id
// @desc    Get event by id
// @Access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @Route   GET api/event
// @desc    Get all events
// @Access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   GET api/event/team_id/:team_id
// @desc    Get all events of the team
// @Access  Public
router.get('/team_id/:id', async (req, res) => {
  try {
    const events = await Event.find({ teams: req.params.id });
    if (!events) {
      return res.status(404).json({ msg: 'Events not found' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   GET api/event/teams
// @desc    Get all events of the teams in array
// @Access  Public
router.get('/teams/:array', async (req, res) => {
  try {
    const events = await Event.find({ teams: { $in: req.params.array } });
    if (!events) {
      return res.status(404).json({ msg: 'Events not found' });
    }
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   DELETE api/event/:id
// @desc    Delete event by id
// @Access  User
router.delete('/:id', auth, async (req, res) => {
  try {
    const events = await Event.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Event deleted' });
    console.log('Event deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   PUT api/event/:id
// @desc    Update event by id
// @Access  User
router.put(
  '/:id',
  auth,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('location', 'Location is required')
      .not()
      .isEmpty(),
    check('from', 'Date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      await Event.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.json({ msg: 'Event updated' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
