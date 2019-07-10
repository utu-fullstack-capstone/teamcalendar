const express = require('express');
const config = require('config');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Event = require('../../models/Events.js');

// POST event

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

    try {
      const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        category: req.body.category,
        teams: req.body.teams
      });

      const event = await newEvent.save();
      console.log('event saved!');
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// GET event by id

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

// GET all events

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE event by ID
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

module.exports = router;
