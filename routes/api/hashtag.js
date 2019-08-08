const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');

// Hashtag Model
const Hashtag = require('../../models/Hashtag');

// @Route   GET api/hashtag
// @desc    Get all feed hashtags
// @Access  User
router.get('/', auth, async (req, res) => {
  try {
    const hashtags = await Hashtag.find();
    res.json(hashtags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   GET api/hashtag/:id
// @desc    Get hashtag by id
// @Access  User
router.get('/:id', async (req, res) => {
  try {
    const hashtag = await Hashtag.findById(req.params.id);

    if (!hashtag) {
      return res.status(404).json({ msg: 'Hashtag not found' });
    }
    res.json(hashtag);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Hashtag not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @Route   POST api/hashtag
// @desc    Create new hashtag
// @Access  User
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const newHashtag = new Hashtag({
        name
      });

      const hashtag = await newHashtag.save();
      console.log('Hashtag saved');
      res.json(hashtag);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route   DELETE api/hashtag/:id
// @desc    Remove hashtag by id
// @Access  User
router.delete('/:id', auth, async (req, res) => {
  try {
    const hashtag = await Hashtag.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Hashtag deleted' });
    console.log('Hashtag deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
