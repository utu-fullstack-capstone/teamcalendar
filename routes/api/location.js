const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');

// Location Model
const Location = require('../../models/Location');

// @Route   GET api/location
// @desc    Get all locations
// @Access  User
router.get('/', auth, async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   GET api/location/:id
// @desc    Get location by id
// @Access  User
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ msg: 'Location not found' });
    }
    res.json(location);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Location not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @Route   POST api/location
// @desc    Create new location
// @Access  User
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('address', 'Address is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, coordinates } = req.body;

    try {
      const newLocation = new Location({
        name,
        address,
        coordinates
      });

      const location = await newLocation.save();
      console.log('Location saved!');
      res.json(location);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route   DELETE api/location/:id
// @desc    Remove location by id
// @Access  User
router.delete('/:id', auth, async (req, res) => {
  try {
    const location = await Location.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Location deleted' });
    console.log('Location deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   PUT api/location
// @desc    Update location
// @Access  User
router.put(
  '/:id',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('address', 'Address is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      await Location.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.json({ msg: 'Location updated' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
