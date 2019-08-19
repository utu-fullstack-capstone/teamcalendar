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

// @Route   GET api/teamcategory/:id
// @desc    Get team category by id
// @Access  User
router.get('/:id', async (req, res) => {
  try {
    const category = await TeamCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @Route   POST api/teamcategory
// @desc    Create new team category
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
      const newTeamCategory = new TeamCategory({
        name
      });

      const category = await newTeamCategory.save();
      console.log('Category saved!');
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route   DELETE api/teamcategory/:id
// @desc    Remove team category by id
// @Access  User
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await TeamCategory.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Category deleted' });
    console.log('Category deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;