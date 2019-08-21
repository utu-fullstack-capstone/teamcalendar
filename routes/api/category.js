const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// Category Model
const Category = require('../../models/Category');

// @Route   GET api/category
// @desc    Get all categories
// @Access  User
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   GET api/category/:id
// @desc    Get category by id
// @Access  User
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

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

// @Route   POST api/category
// @desc    Create new category
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
      let category = await Category.findOne({ name });
      if (category) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Category already exists!' }] });
      }
      const newCategory = new Category({
        name
      });

      await newCategory.save();
      console.log('Category saved!');
      res.json(newCategory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route   DELETE api/category/:id
// @desc    Remove category by id
// @Access  User
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Category deleted' });
    console.log('Category deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   PUT api/category
// @desc    Update category
// @Access  User
router.put(
  '/:id',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      await Category.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.json({ msg: 'Category updated' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
