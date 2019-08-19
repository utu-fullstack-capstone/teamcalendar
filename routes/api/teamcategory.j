const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const TeamCategory = require('../../models/TeamCategory');

// @Route   GET api/teamcategory
// @desc    Get all team categories
// @Access  Public
router.get('/', async (req, res) => {
  try {
    const teamCategories = await TeamCategory.find();
    res.json(teamCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;